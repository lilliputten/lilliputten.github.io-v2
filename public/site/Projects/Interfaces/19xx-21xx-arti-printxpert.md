+++
tags:
  - 2019
  - 2020
  - 2021
  - IoT
  - Interface
  - Intranet
  - Javascript
  - Nodejs
  - Npm
  - Programming
  - Security
  - Spa
  - Arti
  - Prinxpert
  - Web
  - Webpack
  - React
  - Redux
  - Embedded-ui
  - Es6
  - Automation
  - Fullstack
  - Frontend
+++

# PrintXpert IoT project: Embedded MFU interface, Web administration client, middleware NodeJS server

All projects are developed For Moscow-based company "[GK ARTI](http://arti.ru/)" (PrintXpert division,
[ASUPIM](https://arti.ru/management/) project, 2019-2021 years).

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

### Internal pages

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

## Web administration client

<--GALLERY:map
  path: Projects/Web/19xx-arti-printxpert/WebUi/
  # thumbWidth: 200
  thumbHeight: 180
  items:
    -
      image: 001-login-testui.png
      title: Login testui
    -
      image: 002-login-password-changing.png
      title: Login password changing
    -
      image: 002-login-password-reset.png
      title: Login password reset
    -
      image: 003-main-menu-with-version.png
      title: Main menu with version (debug)
    -
      image: 004-main-menu-with-disabled-buttons.png
      title: Main menu with disabled buttons
    # -
    #   image: account-details-access-rights.png
    #   title: Account details access rights
    -
      image: account-details-role-selecting.png
      title: Account details role selecting
    -
      image: admin-device-groups.png
      title: Admin device groups
    -
      image: admin-device-groups-devices-list.png
      title: Admin device groups devices list
    -
      image: auth-params-1-password-options.png
      title: Auth params password options
    -
      image: auth-params-2-cards.png
      title: Auth params cards
    -
      image: auth-params-2-cards-add.png
      title: Auth params cards add
    -
      image: auth-params-3-pin-code.png
      title: Auth params pin code
    -
      image: devices-status.png
      title: Devices status
    -
      image: devices-status-local.png
      title: Devices status local
    -
      image: report-creation.png
      title: Report creation
    -
      image: scheduled-reports-editing-in-debug-mode.png
      title: Scheduled reports editing (in debug mode)
    -
      image: scheduled-reports-removing.png
      title: Scheduled reports removing
    -
      image: user-account-change-password.png
      title: User account change password
    -
      image: user-account-notifications.png
      title: User account notifications
    -
      image: user-account-print-queue.png
      title: User account print queue
    -
      image: user-account-reports-history.png
      title: User account reports history
    -
      image: rules-list.png
      title: Rules list
    -
      image: rule-creation.png
      title: Rule creation
    -
      image: rule-editing.png
      title: Rule editing
    -
      image: rules-modal-filter-window.png
      title: Rules modal filter window
    -
      image: work-log.png
      title: Work log
    -
      image: security-audit-log.png
      title: Security audit log
    -
      image: technical-audit-log.png
      title: Technical audit log
    # -
    #   image:
    #   title:
-->

## Interface components library

(in progress)

## NodeJS middleware server

(in progress)

<!--
 @changed 2023.11.01, 19:03
-->
