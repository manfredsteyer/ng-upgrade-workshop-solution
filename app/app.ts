import {upgradeAdapter} from './app.module';
import './app.routes';

upgradeAdapter.bootstrap(document.body, ['flight-app']);