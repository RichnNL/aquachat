export class UIColorModel {
    fgColor = ['#a1a0a0', '#293347', '#2c61cb', '#2c2c2c', '#121926', '#EDF1F4', '#a1a0a0', '#5c5b5b', '#1B4DAC', '#293347' ];
    bgColor = ['#104097', '#EDF1F4', '#293347', '#104097', '#EDF1F4', '#293347', '#B6000D', '#2c61cb', '#EDF1F4', '#0f0e0e' ];

getFgColor(index: number): string {
    if (index > this.fgColor.length) {
        index =   index % this.fgColor.length;
    }
    return this.fgColor[index];

}

getBgColor(index: number): string {
    if (index > this.bgColor.length) {
        index =   index % this.bgColor.length;
    }
    return this.bgColor[index];
    }
}