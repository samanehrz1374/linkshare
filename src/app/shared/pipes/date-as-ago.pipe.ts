import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAsAgo'
})
export class DateAsAgoPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    if (!value) { return 'a long time ago'; }

    let date= value.substring(0,4)+"-"+value.substring(4,6)+"-"+value.substring(6,8)+"T";
    let timee= value.substring(8)
  
    if(timee.length ==5){
      timee="0"+timee;
    }

    timee= timee.substring(0,2)+":"+timee.substring(2,4)+":"+timee.substring(4,6)

    value=date+timee;
    // console.log(value)
   
    // console.log(date.toLocaleDateString())
    // for(let i=0;i<date.length;i++){
    //   if (i==3){
    //     date[i+1]
    //   }


    // }
   
    // console.log(value)
    let time = (Date.now() - Date.parse(value)) / 1000;
    if (time < 10) {
      return 'الان';
    } else if (time < 60) {
      return 'یک لحظه پیش';
    }
    const divider = [60, 60, 24, 30, 12];
    const string = [' ثانیه', ' دقیقه', ' ساعت', ' روز', ' ماه', ' سال'];
    let i;
    for (i = 0; Math.floor(time / divider[i]) > 0; i++) {
      time /= divider[i];
    }
    // const plural = Math.floor(time) > 1 ? 's' : '';
    return Math.floor(time) + string[i] + ' قبل';
  }

}
