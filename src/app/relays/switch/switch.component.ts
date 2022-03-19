import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { RelayDataInterpreter } from 'procon-ip';
import { RelayService } from '../relay.service';
import { Relay } from '../relay';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    }
  ],
})
export class SwitchComponent implements OnInit, ControlValueAccessor {
  private readonly interpreter: RelayDataInterpreter;

  @Input() relay: Relay;
  @Output() switched = new EventEmitter<string>();

  isDisabled: boolean;
  disabledManualOn: boolean;
  switchValue: string;
  label: string;

  onChange: any = () => {}
  onTouch: any = () => {}

  constructor(
    private service: RelayService,
  ) {
    this.interpreter = service.getInterpreter();
  }

  ngOnInit(): void {
    this.label = this.relay.getLabel();
    this.switchValue = this.relay.isAuto() ? 'auto' : (this.relay.isOn() ? 'on' : 'off');
  }

  switchRelay(desiredState: string): void {
    this.service.set(this.relay.getDataObject(), desiredState).then(() => {});
    this.relay.setSwitched();
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
    console.log('changed disabled', this.isDisabled);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  writeValue(obj: any) {
    this.switchValue = obj as string;
  }
}
