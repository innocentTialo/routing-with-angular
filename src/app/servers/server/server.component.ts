import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  allowEdit = false;
  constructor(private serversService: ServersService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.server = this.serversService.getServer(+this.activatedRoute.snapshot.params['id']);
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    );

    this.allowEdit = this.activatedRoute.snapshot.queryParams['allowEdit'] === '1';
    this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        this.allowEdit = params['allowEdit'] === '1';
      }
    );
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute, queryParamsHandling: 'preserve'});
  }
}
