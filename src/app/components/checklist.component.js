"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var core_2 = require('angular2-cookie/core');
var ng2_bootstrap_modal_1 = require('ng2-bootstrap-modal');
var user_service_1 = require('../services/user.service');
var checklist_service_1 = require('../services/checklist.service');
var task_service_1 = require('../services/task.service');
var checklist_1 = require('../entities/checklist');
var task_1 = require('../entities/task');
var add_task_dialog_component_1 = require('./add.task.dialog.component');
var update_task_dialog_component_1 = require('./update.task.dialog.component');
var delete_task_dialog_component_1 = require('./delete.task.dialog.component');
var delete_checklist_dialog_component_1 = require('./delete.checklist.dialog.component');
var update_checklist_dialog_component_1 = require('./update.checklist.dialog.component');
var print_checklists_dialog_component_1 = require('./print.checklists.dialog.component');
var ChecklistComponent = (function () {
    //selectedChecklistId: string;
    //selectedChecklistName: string;
    function ChecklistComponent(cookieService, router, userService, checklistService, taskService, dialogService) {
        this.cookieService = cookieService;
        this.router = router;
        this.userService = userService;
        this.checklistService = checklistService;
        this.taskService = taskService;
        this.dialogService = dialogService;
        this.title = 'Checklist';
        //TODO: delete, directive test
        this.line_through = false;
        this.checklists = [];
        this.tasks = [];
    }
    ChecklistComponent.prototype.ngOnInit = function () {
        var _this = this;
        var token = this.getCookie("checklist_token");
        this.taskToAdd = new task_1.Task();
        this.taskToUpdate = new task_1.Task();
        this.selectedChecklist = new checklist_1.Checklist();
        this.checklistToUpdate = new checklist_1.Checklist();
        this.allChecklists = [new checklist_1.Checklist()];
        this.checklistsToPrint = [new checklist_1.Checklist()];
        if (!token) {
            this.router.navigate(['/login']);
        }
        this.checklistService.getByOwner(token)
            .subscribe(function (res) {
            _this.checklists = res;
        }, function (error) {
        });
        this.taskService.getByChecklist(this.selectedChecklist.id, token)
            .subscribe(function (res) {
            _this.tasks = res;
        }, function (error) {
        });
    };
    ChecklistComponent.prototype.selectChecklist = function (checklist) {
        var _this = this;
        var token = this.getCookie("checklist_token");
        if (!token) {
            this.router.navigate(['/login']);
        }
        this.selectedChecklist = checklist;
        this.taskService.getByChecklist(this.selectedChecklist.id, token)
            .subscribe(function (res) {
            console.log('Tasks Res: ');
            console.log(res);
            _this.tasks = res;
        }, function (error) {
        });
    };
    ChecklistComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    ChecklistComponent.prototype.logout = function () {
        var _this = this;
        var email = this.cookieService.get("checklist_email");
        var token = this.cookieService.get("checklist_token");
        this.userService.logoutUser(email, token)
            .subscribe(function (res) {
            console.log('Logout response: ');
            console.log(res);
        }, function (error) {
            console.log(error);
            _this.errorMessage = error;
        });
        //remove cookie with token
        this.cookieService.remove("checklist_token");
        this.router.navigate(['/login']);
    };
    ChecklistComponent.prototype.deleteChecklist = function (checklist) {
        var _this = this;
        if (!checklist || !checklist.id) {
            return;
        }
        console.log('Delete 1');
        var token = this.getCookie("checklist_token");
        if (!token) {
            this.router.navigate(['/login']);
        }
        this.checklistService.delete(checklist.id, token)
            .subscribe(function (res) {
            console.log('Removed');
            console.log(res);
            for (var i = 0; i < _this.checklists.length; i++) {
                var checklistToDelete = _this.checklists[i];
                if (checklistToDelete.id == checklist.id) {
                    _this.checklists.splice(i, 1);
                    break;
                }
            }
            // this.checklistService.getByOwner(token)
            //   .subscribe(
            //     res2 => {
            //       this.checklists = <any>res2;
            //     },
            //     error => {
            //     }
            //   );
        }, function (error) {
            console.log('Delete error');
        });
    };
    ChecklistComponent.prototype.deleteTask = function (task) {
        var _this = this;
        if (!task || !task.id) {
            return;
        }
        var token = this.getCookie("checklist_token");
        if (!token) {
            this.router.navigate(['/login']);
        }
        this.taskService.delete(task.id, token)
            .subscribe(function (res) {
            console.log('Removed');
            console.log(res);
            for (var i = 0; i < _this.tasks.length; i++) {
                var taskToDelete = _this.tasks[i];
                if (taskToDelete.id == task.id) {
                    _this.tasks.splice(i, 1);
                    break;
                }
            }
        }, function (error) {
            console.log('Delete error');
        });
    };
    ChecklistComponent.prototype.addChecklist = function () {
        var _this = this;
        if (!this.newChecklistName || this.newChecklistName == "") {
            return;
        }
        var token = this.getCookie("checklist_token");
        if (!token) {
            this.router.navigate(['/login']);
        }
        var newChecklist = new checklist_1.Checklist();
        newChecklist.name = this.newChecklistName;
        this.checklistService.add(newChecklist, token)
            .subscribe(function (res) {
            console.log('Checklist added');
            _this.selectedChecklist = res;
            _this.checklists.push(res);
            _this.newChecklistName = "";
        }, function (error) {
            console.log('Add checklist error');
        });
    };
    ChecklistComponent.prototype.newTask = function () {
        var _this = this;
        if (!this.taskToAdd.name || this.taskToAdd.name == "" || !this.taskToAdd.description || this.taskToAdd.description == "") {
            return;
        }
        var token = this.getCookie("checklist_token");
        if (!token) {
            this.router.navigate(['/login']);
        }
        this.taskService.add(this.taskToAdd, token, this.selectedChecklist.id)
            .subscribe(function (res) {
            console.log('Task added');
            _this.tasks.push(res);
            _this.taskToAdd.id = "";
            _this.taskToAdd.name = "";
            _this.taskToAdd.description = "";
        }, function (error) {
            console.log('New Task error');
        });
    };
    ChecklistComponent.prototype.completeTask = function (task) {
        console.log('TaskId to complete' + task.id);
        var token = this.getCookie("checklist_token");
        if (!token) {
            this.router.navigate(['/login']);
        }
        this.taskService.complete(task.id, token, task.completed)
            .subscribe(function (res) {
            console.log('Task Completed');
            console.log(res);
        }, function (error) {
            console.log('Completed Task error');
        });
    };
    ChecklistComponent.prototype.updateTask = function () {
        var _this = this;
        console.log('TaskId to update ' + this.taskToUpdate.id);
        if (!this.taskToUpdate.name || this.taskToUpdate.name == "" || !this.taskToUpdate.description || this.taskToUpdate.description == "") {
            return;
        }
        var token = this.getCookie("checklist_token");
        if (!token) {
            this.router.navigate(['/login']);
        }
        this.taskService.updateTask(this.taskToUpdate, token)
            .subscribe(function (res) {
            console.log('Task updated');
            for (var i = 0; i < _this.tasks.length; i++) {
                if (_this.taskToUpdate.id == _this.tasks[i].id) {
                    _this.tasks[i] = Object.assign(new task_1.Task, _this.taskToUpdate);
                    break;
                }
            }
            _this.taskToUpdate.id = "";
            _this.taskToUpdate.name = "";
            _this.taskToUpdate.description = "";
        }, function (error) {
            console.log('Update Task error');
        });
    };
    ChecklistComponent.prototype.showAddTaskModal = function () {
        var _this = this;
        var disposable = this.dialogService.addDialog(add_task_dialog_component_1.AddTaskDialogComponent, {
            title: 'Add task',
            message: 'Enter name and description' })
            .subscribe(function (result) {
            if (result) {
                _this.taskToAdd.name = result.name;
                _this.taskToAdd.description = result.description;
                _this.newTask();
            }
            else {
            }
        });
        //We can close dialog calling disposable.unsubscribe();
        //If dialog was not closed manually close it by timeout
        // setTimeout(()=>{
        //     disposable.unsubscribe();
        // },10000);
    };
    ChecklistComponent.prototype.showUpdateTaskModal = function (task) {
        var _this = this;
        this.taskToUpdate = Object.assign(new task_1.Task, task);
        var disposable = this.dialogService.addDialog(update_task_dialog_component_1.UpdateTaskDialogComponent, {
            title: 'Task Information',
            task: this.taskToUpdate,
            taskId: this.taskToUpdate.id,
            name: this.taskToUpdate.name,
            description: this.taskToUpdate.description })
            .subscribe(function (result) {
            if (result) {
                _this.taskToUpdate.name = result.name;
                _this.taskToUpdate.description = result.description;
                _this.updateTask();
            }
            else {
            }
        });
    };
    ChecklistComponent.prototype.showDeleteTaskModal = function (task) {
        var _this = this;
        var disposable = this.dialogService.addDialog(delete_task_dialog_component_1.DeleteTaskDialogComponent, {
            title: 'Delete task',
            message: 'Are you sure you want to the task "' + task.name + '"', name: this.taskToUpdate.name, description: this.taskToUpdate.description })
            .subscribe(function (result) {
            if (result) {
                _this.deleteTask(task);
            }
        });
    };
    ChecklistComponent.prototype.showDeleteCheckListModal = function (checklist) {
        var _this = this;
        var disposable = this.dialogService.addDialog(delete_checklist_dialog_component_1.DeleteChecklistDialogComponent, {
            title: 'Delete checklist',
            message: 'Are you sure you want to delete the checklist "' + checklist.name + '"' })
            .subscribe(function (result) {
            if (result) {
                _this.deleteChecklist(checklist);
            }
        });
    };
    ChecklistComponent.prototype.showUpdateChecklistModal = function (checklist) {
        var _this = this;
        this.checklistToUpdate = Object.assign(new checklist_1.Checklist, checklist);
        var disposable = this.dialogService.addDialog(update_checklist_dialog_component_1.UpdateChecklistDialogComponent, {
            title: 'Update checklist',
            message: 'Enter checklist name', name: this.checklistToUpdate.name })
            .subscribe(function (result) {
            if (result) {
                _this.checklistToUpdate.name = result.name;
                console.log("Result" + result.name);
                _this.editChecklistName();
            }
            else {
            }
        });
    };
    ChecklistComponent.prototype.editChecklistName = function () {
        var _this = this;
        if (!this.selectedChecklist.id || this.selectedChecklist.id == "" || !this.selectedChecklist.name || this.selectedChecklist.name == "") {
            return;
        }
        var token = this.getCookie("checklist_token");
        if (!token) {
            this.router.navigate(['/login']);
        }
        this.checklistService.updateChecklist(this.checklistToUpdate, token)
            .subscribe(function (res) {
            for (var i = 0; i < _this.checklists.length; i++) {
                if (_this.checklistToUpdate.id == _this.checklists[i].id) {
                    _this.checklists[i] = Object.assign(new checklist_1.Checklist, _this.checklistToUpdate);
                    _this.selectedChecklist = _this.checklists[i];
                    break;
                }
            }
            _this.checklistToUpdate.id = "";
            _this.checklistToUpdate.name = "";
            _this.checklistToUpdate.tasks = [];
        }, function (error) {
            console.log('Update Checklist error');
        });
    };
    ChecklistComponent.prototype.getChecklistByOwnerWithTasks = function () {
        var _this = this;
        var token = this.getCookie("checklist_token");
        if (!token) {
            this.router.navigate(['/login']);
        }
        this.checklistService.getByOwner(token)
            .subscribe(function (res) {
            _this.allChecklists = res;
            console.log('All checklists');
            console.log(_this.allChecklists);
            _this.allChecklists.forEach(function (thisChecklist) {
                _this.taskService.getByChecklist(thisChecklist.id, token)
                    .subscribe(function (res2) {
                    var tasks = res2;
                    thisChecklist.tasks = tasks;
                }, function (error2) {
                });
            });
            var disposable = _this.dialogService.addDialog(print_checklists_dialog_component_1.PrintChecklistsDialogComponent, {
                title: 'Print checklists',
                message: '',
                checklists: _this.allChecklists })
                .subscribe(function (result) {
                if (result) {
                    var checklistsToPrint = result.checklistsToPrint;
                    _this.checklistsToPrint = [new checklist_1.Checklist()];
                    var i = void 0;
                    for (i = 0; i < checklistsToPrint.length; i++) {
                        _this.checklistsToPrint.push(checklistsToPrint[i]);
                    }
                    // this.checklistsToPrint = result.checklistsToPrint;
                    // console.log('Checklists to print: ');
                    // console.log(this.checklistsToPrint);
                    //TODO: check how to wait until model-view binding is done and remove next lines
                    // var start = new Date().getTime();
                    // var end = start;
                    // while(end < start + 1000) {
                    //   end = new Date().getTime();
                    // }
                    // this.printChecklists();
                    _this.print(checklistsToPrint);
                }
            });
        }, function (error) {
            return undefined;
        });
    };
    ChecklistComponent.prototype.print = function (checklists) {
        var printContents;
        var i;
        for (i = 0; i < checklists.length; i++) {
            if (checklists[i].print) {
                var tasks = '';
                var j = void 0;
                for (j = 0; j < checklists[i].tasks.length; j++) {
                    tasks += '<span>' + checklists[i].tasks[j].name + '</span><br\>';
                }
                printContents += "\n          <ul>\n            <li>\n              <div>\n                <h1>" + checklists[i].name + "</h1>" + tasks +
                    "</div>\n            </li>\n          </ul>\n        ";
            }
        }
        var popupWin;
        // printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write("\n      <html>\n        <head>\n          <title>Checklist report</title>\n          <style>\n          //........Customized style.......\n          </style>\n        </head>\n    <body onload=\"window.print();window.close()\">\n      " + printContents + "  \n    </body>\n      </html>");
        popupWin.document.close();
    };
    ChecklistComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'checklist',
            templateUrl: '../templates/checklist.component.html',
            styleUrls: ['../../assets/css/demo.css',
                '../../assets/css/pixeladmin.css',
                '../../assets/css/frost.css'],
            providers: [core_2.CookieService]
        }), 
        __metadata('design:paramtypes', [core_2.CookieService, router_1.Router, user_service_1.UserService, checklist_service_1.ChecklistService, task_service_1.TaskService, ng2_bootstrap_modal_1.DialogService])
    ], ChecklistComponent);
    return ChecklistComponent;
}());
exports.ChecklistComponent = ChecklistComponent;
//# sourceMappingURL=checklist.component.js.map