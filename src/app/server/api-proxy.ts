import { Router } from 'express';
import axios, { AxiosResponse } from 'axios';

interface IAPIResponse {
  status: number;
  data: unknown;
}

const router = Router();
const baseUrl = 'https://codesphere-backend-npta.onrender.com';
const cache = {} as any;

router.post('/auth/token', (req, res) => {
  const token = req.body['token'];

  res.cookie('access_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
  });

  prefetch(token);

  res.status(204).json({});
});

router.post('/proxy', (req, res) => {
  const { resource, data, method, disableCache } = req.body;
  const token = req.cookies['access_token'];

  console.log({ body: req.body, cache: cache[resource] });

  if (
    cache[resource] &&
    !['POST', 'PUT', 'DELETE'].includes(method) &&
    !disableCache
  ) {
    return res.status(200).json(cache[resource]);
  }

  return doCall(`${baseUrl}/${resource}`, token, method, data).then(
    ({ data, status }) => {
      cache[resource] = data;

      return res.status(status).json(data);
    }
  );
});

function prefetch(token: string): void {
  console.log({ cache });

  doCall(`${baseUrl}/category`, token).then(({ status, data }) => {
    if (status === 200) {
      cache['category'] = data;

      for (const category of data as any[]) {
        doCall(`${baseUrl}/problem?categoryId=${category.id}`, token).then(
          ({ status, data }) => {
            if (status === 200) {
              cache[`problem?categoryId=${category.id}`] = data;
            }

            const result = (data as any)['result'];

            for (const problem of result) {
              doCall(`${baseUrl}/problem/${problem.id}`, token).then(
                ({ data, status }) => {
                  if (status === 200) {
                    cache[`problem/${problem.id}`] = data;
                  }
                }
              );
            }
          }
        );
      }
    }
  });

  sleep(300000).then(() => {
    prefetch(token);
  });
}

async function doCall(
  url: string,
  token: string,
  method = 'GET',
  data = {}
): Promise<IAPIResponse> {
  const authorizarion = `Bearer ${token}`;
  let request: Promise<AxiosResponse>;

  switch (method) {
    case 'GET':
      request = axios.get(url, {
        headers: {
          Authorization: authorizarion,
        },
      });
      break;
    default:
      request = axios.post(url, data, {
        headers: {
          Authorization: authorizarion,
        },
      });
  }

  return request
    .then(({ status, data }) => ({ status, data }))
    .catch((error) => {
      console.error('APICallErrpr', error);

      if (error.response) {
        const { status, data } = error.response;

        return {
          status,
          data,
        };
      }

      return {
        status: 500,
        data: { message: 'Erro ao conectar com o serviço' },
      };
    });
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default router;
