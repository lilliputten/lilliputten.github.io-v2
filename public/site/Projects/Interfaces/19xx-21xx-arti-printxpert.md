+++
tags:
  - 2019
  - 2020
  - 2021
  - interface
  - intranet
  - javascript
  - nodejs
  - npm
  - programming
  - security
  - spa
  - arti
  - prinxpert
  - web
  - webpack
  - react
  - redux
  - embedded-ui
  - es6
  - automation
  - fullstack
  - frontend
+++

# Embedded MFU interface, Web administration client, middleware NodeJS server

All projects are developed For Moscow-based company "[GK
ARTI](http://arti.ru/)" (PrintXpert division,
[ASUPIM](https://arti.ru/management/) project) in 2019-2021 years.

## View of the demonstration stand in the exhibition pavilion

<div class="FrontImage">
  <img src="https://res.cloudinary.com/lilliputten/image/upload/c_thumb,w_648,g_face/v1542040058/Projects/Web/19xx-arti-printxpert/general/210512-exhibition-stand.jpg" />
</div>

## Projects overview

- Development of embedded interfaces (for limited functionality browsers like
  ANT Galio, WebKit; designed for different resolutions, from minimalistic
  resolutions like 360x240 to extra large layouts, like 1600x1024 pixels) for
  print management terminals.
- R&D of new browsers/devices, support for unified universal code.
- Implemented own minimal and universal i-bem-like interface engine (uses
  templates, webpack/babel based infrastructure of component objects associated
  with dom tree elements).
- Support for the development environment (build, tests, automation, dev
  server, demo modes for R&D, logs receiving server).
- Development and support of a middleware server (node js) with support for the
  client interface (entrypoint, passing configuration parameters, session
  parameters, processing media requests, scanning-copy device requests for
  transferring scanned images to the application server, development logs
  processing and retranslation).
- Development of react-based web client for the administration system
  (webpack/react/redux/saga).
- Projecting, development and support of components library for web
  administration client.

## Embedded MFU interface

### System start

<--GALLERY:map
  path: Projects/Web/19xx-arti-printxpert/terminal-interface/
  # thumbWidth: 200
  thumbHeight: 180
  items:
    -
      image: 001-start2.png
      title: Interface starting, initial stage, with dev panel
    -
      image: 002-start.png
      title: Interface starting, final stage, with dev panel & bunch of diagnostic messages (specific for development mode)
    -
      image: 101-main-menu.png
      title: Main system menu loaded
    -
      image: 101-login-with-pin.png
      title: Login screen (waiting for card access or PIN code entering)
    -
      image: 101-entering.png
      title: Entering to system (loading data)
    -
      image: 101-entering-2.png
      title: Entering to internal page (loading data)
-->

## Internal pages

<--GALLERY:map
  path: Projects/Web/19xx-arti-printxpert/terminal-interface/
  # thumbWidth: 200
  thumbHeight: 180
  items:
    -
      image: 201-copy-page-1.png
      title: Copy page / Screen 1
    -
      image: 201-copy-page-2.png
      title: Copy page / Screen 2
    -
      image: 201-copy-page-3.png
      title: Copy page / Screen 3
    -
      image: 202-copy-page-numeric-option.png
      title: Copy page / Entering numeric parameter
    -
      image: 202-copy-page-settings.png
      title: Copy page / Selecting copy options
    -
      image: 301-print-page.png
      title: Print page (just entered)
    -
      image: 301-print-page-selected.png
      title: Print page (with active selection)
    -
      image: 302-print-page-printing.png
      title: Printing active jobs (waiting for print process finishing)
    -
      image: 401-scan-page-settings.png
      title: Scan page (fragment of long settings screen)

-->

<!--
 @changed 2021.08.18, 20:53
-->
