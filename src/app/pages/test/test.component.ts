import { Component, OnInit } from '@angular/core';
import { AuthContextService } from '../../services/auth-context.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent implements OnInit {
  constructor(private readonly _authContextService: AuthContextService) {}

  ngOnInit(): void {
    alert(this._authContextService.token);
  }
}
