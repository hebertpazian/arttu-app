import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faFacebookF,
  faInstagram,
  faGithub
} from '@fortawesome/free-brands-svg-icons'

import {
  faUserCircle,
  faCaretDown,
  faSignOutAlt,
  faCaretUp,
  faUpload
} from '@fortawesome/free-solid-svg-icons'

library.add(faUserCircle, faCaretUp, faCaretDown, faSignOutAlt, faUpload)
library.add(faFacebookF, faInstagram, faGithub)

export default Vue.component('FontAwesomeIcon', FontAwesomeIcon)
