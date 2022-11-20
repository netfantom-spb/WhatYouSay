import {config} from './config'
import SiteWorker  from '../../SiteWorker'

console.log('Maccabi content script');

SiteWorker(window.location.href, config);