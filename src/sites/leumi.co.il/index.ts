import {config} from './config'
import SiteWorker  from '../../SiteWorker'

console.log('Leumi content script');

SiteWorker(window.location.href, config);