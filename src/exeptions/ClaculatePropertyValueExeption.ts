import HttpException from "./HttpExeption";

class ClaculatePropertyValueExeption extends HttpException {
  constructor(msg: string) {
    super(400, msg);
  }
}
 
export default ClaculatePropertyValueExeption;