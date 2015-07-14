/**
 * Created by Administrator on 2015/7/14.
 */
module mallConsoleApp{
  export interface IUtils {
    findById(a:any[], id:any,key :string):any;
  }
  export class Utils{

    findById(a:any[], id:any,key:string) {
      for (var i = 0; i < a.length; i++) {
        if (a[i][key||'id'] == id) return a[i];
      }
      return null;
    }

  }

}
