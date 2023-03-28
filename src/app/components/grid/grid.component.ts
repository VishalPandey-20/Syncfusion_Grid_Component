import { Component, OnInit } from '@angular/core';
import { GridService } from '../service/grid.service';
import { CommandModel, EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  public data: object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public commands: CommandModel[];
  public formProperties: FormGroup;

  constructor(
    private _gridService: GridService
  ) {
  }

  ngOnInit() {
    this.getGridData();
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add'];
    this.commands = [
      { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
      // { buttonOption: { content: 'Delete', cssClass: 'e-flat' } },
    ];
  }

  actionComplete(args: any) {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      const dialog = args.dialog;
      console.log(dialog, 'dialog');
      dialog.header = args.requestType === 'beginEdit' ? args.rowData['programName'] : 'New Record';
    }
  }

  actionBegin(args: any) {
    if (args.action === 'add') {
      if (args.requestType === 'save') {
        this.formProperties = this.createFormGroup(args.data);
        var formData = new FormData();
        formData.append('ProgramName', this.formProperties.value.ProgramName);
        formData.append('ProgramNumber', this.formProperties.value.ProgramNumber);
        formData.append('ProgramBudget', this.formProperties.value.ProgramBudget);
        formData.append('ProgramDescription', this.formProperties.value.ProgramDescription);
        console.log(this.formProperties, 'this.formProperties');
        this._gridService.addGridComponentData(formData).subscribe((res) => {
          console.log(res, 'resrrrrrr');
          setTimeout(() => {
            location.reload();
          }, 5000)
        });
      };
    };
    if (args.action === 'edit') {
      if (args.requestType === 'save') {
        var formData = new FormData();
        formData.append('ProgramId', args.data.programID);
        formData.append('ProgramName', args.data.programName);
        formData.append('ProgramNumber', args.data.programNumber);
        formData.append('ProgramBudget', args.data.programBudget);
        formData.append('ProgramDescription', args.data.programDescription);
        this._gridService.editGridComponentData(formData).subscribe((res) => {
          console.log(res);
          setTimeout(() => {
            location.reload();
          }, 5000)
        });
      };
    };

  }

  createFormGroup(formData: formModel): FormGroup {
    return new FormGroup({
      ProgramName: new FormControl(formData?.programName, Validators.required),
      ProgramNumber: new FormControl(formData?.programNumber, Validators.required),
      ProgramBudget: new FormControl(formData?.programBudget, Validators.required),
      ProgramDescription: new FormControl(formData?.programDescription),
    });
  }

  getGridData() {
    this._gridService.getGridComponentData().subscribe((res) => {
      console.log(res);
      this.data = res.programs;
    })
  }

  // commandClick(args: any): void {
  //   if (args.commandColumn.type !== 'Edit') {
  //     this._gridService.deleteGridComponentData(args.rowData.programID).subscribe((res) => {
  //       if (res.success) {
  //         console.log(res);
  //         setTimeout(() => {
  //           location.reload();
  //         }, 5000)
  //       }
  //     })
  //   }
  // }

  deleteData(id: any) {
    this._gridService.deleteGridComponentData(id).subscribe((res) => {
      if (res.success) {
        console.log(res);
        setTimeout(() => {
          location.reload();
        }, 5000)
      }
    })
  }

  editDeleteData(data: any) {
    debugger
    var formData = new FormData();
    formData.append('programID', data.programID);
    var programID = formData.get('programID')
    this._gridService.ActiveData(programID).subscribe((res) => {
      console.log(res);

    })
  }
}


export interface formModel {
  programName: any;
  programNumber: any;
  programBudget: any;
  programDescription: any;
}