import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { IUser } from '../../shared/models/interfaces/user.interface';
import { UtilsService } from '../../services/utils-service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  public user!: IUser;
  public registerAt!: string;

  constructor(
    private readonly _apiService: APIService,
    private readonly _utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this._apiService.getUserProfile().subscribe((user) => {
      this.user = user;
      this.registerAt = this._utilsService.formatDate('dd/MM/yyyy');
    });
  }
}
