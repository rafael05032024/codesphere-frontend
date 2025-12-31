import { Component, OnInit } from '@angular/core';
import { ProxyService } from '../../services/proxy.service';
import { IUser } from '../../shared/models/interfaces/user.interface';
import { UtilsService } from '../../services/utils-service';
import { UserService } from '../../services/user.service';

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
    private readonly _userService: UserService,
    private readonly _utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.user = this._userService.get();
    this.registerAt = this._utilsService.formatDate('dd/MM/yyyy');
  }
}
