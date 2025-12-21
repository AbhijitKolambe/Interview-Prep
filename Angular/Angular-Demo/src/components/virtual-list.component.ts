import { Component } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  standalone: true,
  selector: 'app-virtual-list',
  imports: [ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport
      itemSize="50"
      style="height: 400px; border: 1px solid #ccc">

      <div *cdkVirtualFor="let item of items">
        {{ item }}
      </div>

    </cdk-virtual-scroll-viewport>
  `
})
export class VirtualListComponent {
  items = Array.from({ length: 100000 }, (_, i) => `Item #${i}`);
}
