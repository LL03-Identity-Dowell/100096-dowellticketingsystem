import lineManagerController from '../controller/lineManagerController.js';
import { Router } from 'express';

const lineRouters = Router();
lineRouters.route('/create-lineManager').post(lineManagerController.create);
lineRouters.route('/update-lineManager').put(lineManagerController.update);
lineRouters.route('/get-lineManagers').get(lineManagerController.read);
lineRouters.route('/get-all-lineManagers').get(lineManagerController.readAll);
lineRouters.route('/delete-lineManager').delete(lineManagerController.remove);

export default lineRouters;
