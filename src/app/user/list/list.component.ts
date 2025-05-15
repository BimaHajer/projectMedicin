import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  roleFilter: string = 'all';
  deleteUserId: number | null = null;
  isDeleteDialogOpen = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = 
        user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesRole = this.roleFilter === 'all' || user.roles.includes(this.roleFilter);

      return matchesSearch && matchesRole;
    });
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.applyFilters();
  }

  onRoleFilter(role: string) {
    this.roleFilter = role;
    this.applyFilters();
  }

  handleDeleteClick(id: number) {
    this.deleteUserId = id;
    this.isDeleteDialogOpen = true;
  }

  confirmDelete() {
    if (this.deleteUserId) {
      this.userService.deleteUser(this.deleteUserId).subscribe(() => {
        this.loadUsers();
        this.isDeleteDialogOpen = false;
        this.deleteUserId = null;
      });
    }
  }

  getRoleBadgeClass(role: string): string {
    switch (role) {
      case 'ROLE_ADMIN': return 'bg-red-100 text-red-800';
      case 'ROLE_MEDECIN': return 'bg-sky-100 text-sky-800';
      case 'ROLE_LABORANT': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
