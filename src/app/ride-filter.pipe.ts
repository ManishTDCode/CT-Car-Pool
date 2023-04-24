import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rideFilter'
})
export class RideFilterPipe implements PipeTransform {

  transform(ridedata: any, searchInput1: string,searchInput2: string ,key1: string,key2:string): any[] {
    // console.log("searchInput", searchInput);
    let data = ridedata;
    if (searchInput1 === '' && searchInput2 === '') {
      return ridedata;
    }
    if (searchInput1 === '') {
      data = ridedata.filter((x: { [x: string]: string; }) => x[key2]===searchInput2)
    } else if(searchInput2 === '') {
      data = ridedata.filter((x: { [x: string]: string; }) => x[key1]===searchInput1)
    }else if(searchInput1 !== '' && searchInput2 !== '') {
      data = ridedata.filter((x: { [x: string]: string; }) => (x[key2]===searchInput2 && x[key1]===searchInput1))
    }
    return data;
  }

}
