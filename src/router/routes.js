/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in routes.js is proprietary and confidential.                     *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

const routes =
    [
        {
            path: '/',
            name: 'Dashboard',
            components: {
                appbar: () => import('../components/Bars/AppBar'),
                navbar: () => import('../components/Bars/NavBar'),
                footer: () => import('../components/Bars/FooterBar'),
                content: () => import('../views/Dashboard'),
            },
            meta: {
                title: 'Siemens - Dashboard',
                metaTags: [
                    {
                        name: 'description',
                        content: 'This is the main dashboard.'
                    },
                    {
                        property: 'og:description',
                        content: 'This is the main dashboard.'
                    }
                ]
            }
        },
        {
            path: '/map',
            name: 'Map',
            components: {
                appbar: () => import('../components/Bars/AppBar'),
                navbar: () => import('../components/Bars/NavBar'),
                footer: () => import('../components/Bars/FooterBar'),
                content: () => import('../views/Map'),
            },
            meta: {
                title: 'Siemens - Map',
                metaTags: [
                    {
                        name: 'description',
                        content: 'The map of our app.'
                    },
                    {
                        property: 'og:description',
                        content: 'The map page of our app.'
                    }
                ]
            }
        },

        {
            path: '/sign-up',
            name: 'Sign Up',
            components: {
                appbar: null,
                navbar: null,
                footer: null,
                content: () => import('../views/SignUp'),
            },
            meta: {
                title: 'Siemens - Sign Up',
                metaTags: [
                    {
                        name: 'description',
                        content: 'The Sign Up page of the application.'
                    },
                    {
                        property: 'og:description',
                        content: 'The Sign Up page of the application.'
                    }
                ]
            }
        },
        {
            path: '/sign-in',
            name: 'Sign In',
            components: {
                appbar: null,
                navbar: null,
                footer: null,
                content: () => import('../views/SignIn'),
            },
            meta: {
                title: 'Siemens - Sign In',
                metaTags: [
                    {
                        name: 'description',
                        content: 'The Sign In page of the application.'
                    },
                    {
                        property: 'og:description',
                        content: 'The Sign In page of the application.'
                    }
                ]
            }
        },
        {
            path: '*',
            name: 'NotFound',
            components: {
                appbar: () => import('../components/Bars/AppBar'),
                navbar: () => import('../components/Bars/NavBar'),
                footer: () => import('../components/Bars/FooterBar'),
                content: () => import('../views/FourOFour'),
            },
            meta: {
                title: '404 - Not Found',
                metaTags: [
                    {
                        name: 'description',
                        content: '404 - Not Found.'
                    },
                    {
                        property: 'og:description',
                        content: '404 - Not Found.'
                    }
                ]
            }
        },
    ];

export default routes