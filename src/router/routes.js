/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in routes.js is proprietary and confidential.                     *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

const projectName = 'Berthy';

const routes =
    [
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
                title: projectName + ' - Sign Up',
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
                title: projectName + ' - Sign In',
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
            path: '/faq',
            name: 'FAQ',
            components: {
                appbar: () => import('../components/Bars/AppBar'),
                navbar: () => import('../components/Bars/NavBar'),
                footer: () => import('../components/Bars/FooterBar'),
                content: () => import('../views/FAQ'),
            },
            meta: {
                title: projectName + ' - FAQ',
                metaTags: [
                    {
                        name: 'description',
                        content: 'FAQ.'
                    },
                    {
                        property: 'og:description',
                        content: 'FAQ.'
                    }
                ]
            }
        },
        {
            path: '/profile',
            name: 'Profile',
            components: {
                appbar: () => import('../components/Bars/AppBar'),
                navbar: () => import('../components/Bars/NavBar'),
                footer: () => import('../components/Bars/FooterBar'),
                content: () => import('../views/Profile'),
            },
            meta: {
                title: projectName + ' - Profile',
                metaTags: [
                    {
                        name: 'description',
                        content: 'User profile and account info.'
                    },
                    {
                        property: 'og:description',
                        content: 'User profile and account info.'
                    }
                ]
            }
        },
        {
            path: '/',
            name: 'Dashboard',
            components: {
                appbar: () => import('../components/Bars/AppBar'),
                navbar: () => import('../components/Bars/NavBar'),
                footer: () => import('../components/Bars/FooterBar'),
                content: () => import('../views/Dockmaster/Dashboard'),
            },
            meta: {
                title: projectName + ' - Dashboard',
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
            path: '/messages',
            name: 'Messages',
            components: {
                appbar: () => import('../components/Bars/AppBar'),
                navbar: () => import('../components/Bars/NavBar'),
                footer: () => import('../components/Bars/FooterBar'),
                content: () => import('../views/Dockmaster/Messages'),
            },
            meta: {
                title: projectName + ' - Messages',
                metaTags: [
                    {
                        name: 'description',
                        content: 'Messages page.'
                    },
                    {
                        property: 'og:description',
                        content: 'Messages page.'
                    }
                ]
            }
        },
        {
            path: '/requests',
            name: 'Requests',
            components: {
                appbar: () => import('../components/Bars/AppBar'),
                navbar: () => import('../components/Bars/NavBar'),
                footer: () => import('../components/Bars/FooterBar'),
                content: () => import('../views/Dockmaster/Requests'),
            },
            meta: {
                title: projectName + ' - Requests',
                metaTags: [
                    {
                        name: 'description',
                        content: 'Requests page.'
                    },
                    {
                        property: 'og:description',
                        content: 'Requests page.'
                    }
                ]
            }
        },
        {
            path: '/team',
            name: 'Team',
            components: {
                appbar: () => import('../components/Bars/AppBar'),
                navbar: () => import('../components/Bars/NavBar'),
                footer: () => import('../components/Bars/FooterBar'),
                content: () => import('../views/Dockmaster/Team'),
            },
            meta: {
                title: projectName + ' - Team',
                metaTags: [
                    {
                        name: 'description',
                        content: 'Team page.'
                    },
                    {
                        property: 'og:description',
                        content: 'Team page.'
                    }
                ]
            }
        },
        {
            path: '/settings',
            name: 'Settings',
            components: {
                appbar: () => import('../components/Bars/AppBar'),
                navbar: () => import('../components/Bars/NavBar'),
                footer: () => import('../components/Bars/FooterBar'),
                content: () => import('../views/Dockmaster/Settings'),
            },
            meta: {
                title: projectName + ' - Settings',
                metaTags: [
                    {
                        name: 'description',
                        content: 'Settings page.'
                    },
                    {
                        property: 'og:description',
                        content: 'Settings page.'
                    }
                ]
            }
        },
        {
            path: '/Book',
            name: 'Book',
            components: {
                appbar: () => import('../components/Bars/AppBar'),
                navbar: () => import('../components/Bars/NavBar'),
                footer: () => import('../components/Bars/FooterBar'),
                content: () => import('../views/Boater/Book'),
            },
            meta: {
                title: projectName + ' - Book',
                metaTags: [
                    {
                        name: 'description',
                        content: 'Map to find all the marinas and book a spot.'
                    },
                    {
                        property: 'og:description',
                        content: 'Map to find all the marinas and book a spot.'
                    }
                ]
            }
        },
        {
            path: '/404',
            name: 'NotFound',
            components: {
                appbar: () => import('../components/Bars/AppBar'),
                navbar: () => import('../components/Bars/NavBar'),
                footer: () => import('../components/Bars/FooterBar'),
                content: () => import('../views/FourOFour'),
            },
            meta: {
                title: projectName + ' - 404 Not Found',
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
        {
            path: '*',
            redirect: '/404'
        }
    ];

export default routes