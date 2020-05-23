/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in _globals.js is proprietary and confidential.                   *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

import Vue from "vue"
import upperFirst from "lodash"
import camelCase from "lodash"

const requireComponent = require.context(
    '.', false, /base-[\w-]+\.vue$/
);
requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);
    const componentName = upperFirst(
        camelCase(
            fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
        )
    );
    Vue.component(componentName, componentConfig.default);
});