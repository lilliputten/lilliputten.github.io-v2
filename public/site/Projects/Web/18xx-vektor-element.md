+++
tags:
  - 2016
  - 2017
  - 2018
  - bem-html
  - bem-xjst
  - bemhint
  - borschik
  - design
  - element
  - enb
  - gis
  - gulp
  - i-bem
  - interface
  - intranet
  - javascript
  - nodejs
  - npm
  - programming
  - security
  - spa
  - vektor
  - web
+++

# "Element"

Online GIS monitoring and control system.

The application was developed during 2016-2018 for the "Vector" engeneering bureau.

### The SPA architecture is implemented on the technology stack consists&nbsp;of:

- Client-side JavaScript: [i-bem.js](https://en.bem.info/technologies/classic/i-bem/).
- Templates engine: [BEMHTML/BEMTREE](https://en.bem.info/technologies/classic/bem-xjst/8/),
  [BEMJSON](https://en.bem.info/technologies/classic/bemjson/).
- CSS Preprocessing: [Stylus](http://stylus-lang.com/).

### Tools used:

- Confgiuration: [bem-config](https://en.bem.info/toolbox/sdk/bem-config/).
- Catalogues/modules maintenance: [bem-tools](https://en.bem.info/toolbox/bem-tools/).
- Linting: [bemhint](https://en.bem.info/toolbox/bemhint/).
- Assembling: Gulp, [enb](https://en.bem.info/toolbox/enb/),
  [enb-borschik](https://ru.bem.info/toolbox/enb/packages/enb-borschik/api/).
- System level: NodeJS, NPM, Shell/Cmd automation.

### Server-side software:

- Phalcon/PHP (Middleware server).
- Nginx (Frontend server).
- NodeJS (application server).

### Tasks performed:

- SPA architecture/enviroment design & development.
- Interface engine development.
- Interface components/guidelines design.
- Participation in the development of the authorization system.
- Frontend development environment design (including server/live data
  emulation, remote deploy, local/remote production bundle generation).
- Interface components development (see below).
- Server-side programming (partial: some middleware level modules -- response
  interface for client requests).

### Frontend components and features:

- Configuration delivery/extending system.
- App bootstraping system.
- Authorization system (particpated).
- Core system module (`App`: loading and caching of resources, loading of
  system code/templates/styles packages on-demand -- "code splitting feature",
  pages/screens rendering, events managing etc).
- Reports generator (generic logic/data overriding for specific reports) with
  async (sockets-based) cancelable data loading capability.
- `MapView` module (actually -- a group of modules loaded when map functionality needed) based on
  [Openlayers](https://openlayers.org) amp engine (loaded on-demand too).
- Main application layout (menu, system/page titles, system/user menu, events
  displaying, progressbars and splash screens support).
- Progress and current processing tasks displaying.
- Design components demo collections/snippets (for easy navigation, testing and preview).
- Easy templates customization possibility (using general config/design resources replacements).
- Brief documentation for frontend part of the system.

The project was handed over to the employer with the accompanying documentation
in the summer of 2018 after two years of development.

## Links

- Documentation written at the time of project delivering: [lilliputten/vector-docs](https://github.com/lilliputten/vector-docs)
- Code excerpts (made for future devlopers hiring): [lilliputten/vektor-element-sample-exposures](https://github.com/lilliputten/vektor-element-sample-exposures):

## System screenshots

### Logon/logout screens

<--GALLERY:intro
  path: Projects/Web/18xx-vektor-element/
  # thumbWidth: 200
  thumbHeight: 180
  items:
    -
      image: intro-screen-1-auth-type.png
      title: Select authorisation type
    -
      image: intro-screen-2-auth-login.png
      title: Enter your login/password
    #-
    #  image: intro-screen-loader-details1.png
    #  title:
    -
      image: intro-screen-loader-details2.png
      title: Loader progressbar with detailed tasks panel opened
    -
      image: intro-logout.png
      title: Logout screen
-->

### Map screens

<--GALLERY:map
  path: Projects/Web/18xx-vektor-element/
  # thumbWidth: 200
  thumbHeight: 180
  items:
    -
      image: report-map-zones-menu.png
      title: Complex report with map (areas & tracks intersection)
    -
      image: map-details-interface-address-checking-failed.png
      title: Data interface validation failed
    -
      image: map-objects-select-mark_messages-reply-cluster-select-zone.png
      title: Single object, objects group and areas
    -
      image: map-vectors_measures1.png
      title: Speed vectors and measurers
    -
      image: map-with-objects_events_details_menu.png
      title: Main menu, objects icon (pre-beta)
    -
      image: map-zones-with-names.png
      title: Overlapping areas and areas' selecting interface
-->

### Reports data

<--GALLERY:reports
  path: Projects/Web/18xx-vektor-element/
  # thumbWidth: 200
  thumbHeight: 180
  items:
    -
      image: report-input-data-error.png
      title: Source data selecting error
    -
      image: report-async-data-loading.png
      title: Async data loading (progressbar & cancel button)
-->

### Map generalisation samples

<--GALLERY:generalisation
  path: Projects/Web/18xx-vektor-element/
  # thumbWidth: 200
  thumbHeight: 180
  items:
    -
      image: generalisation-details2.jpg
      title: Object labels non-overlaping location
    #-
    #  image: generalisation-view1.png
    #  title: Object labels are not overlapped
    -
      image: generalisation-view1-cr.png
      title: Collision of finding non-overlapping label positions (white mark)
    -
      image: generalisation-view2.jpg
      title: Grouped object labels
-->

### Interface details & snippets

<--GALLERY:interface
  path: Projects/Web/18xx-vektor-element/
  # thumbWidth: 200
  thumbHeight: 180
  items:
    -
      image: interface-details-event-highlights.png
      title: Received events (via sockets data) highlighting changed data in real-time
    -
      image: intreface-details-sections.png
      title: Opened section with detailed object data
    -
      image: intreface-details-detailed-section.jpg
      title: Opened section with editable fields
    -
      image: intreface-details-tableview.png
      title: Table control with sorting, filtering and columns resizing
    -
      image: intreface-pelengs.png
      title: Object bearings in minimized mode
    -
      image: intreface-peleng-details-editable-cr.jpg
      title: Object bearings with editable complex fields
    -
      image: intreface-snippets-inputs-editable.png
      title: Demo component snippets -- editable fields
    -
      image: intreface-snippets-inputs-view.png
      title: Demo component snippets -- fields in view mode
-->

