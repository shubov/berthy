/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in routes.js is proprietary and confidential.                     *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/

const projectName = 'Berthy';
const roles = {
    user: 'USER',
    moderator: 'MODERATOR',
    admin: 'ADMIN',
};

const routes =
    [
        {
            path: '/marina/:id',
            name: 'Marina',
            components: {
                appbar: () => import('../components/Bars/AppBar'),
                navbar: null,
                footer: () => import('../components/Bars/FooterBar'),
                content: () => import('../views/Public/Marina'),
            },
            meta: {
                public: true,
                title: projectName + ' - Marina',
                metaTags: [
                    {
                        name: 'description',
                        content: 'Page.'
                    },
                    {
                        property: 'og:description',
                        content: 'Page.'
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
                content: () => import('../views/Public/SignUp'),
            },
            meta: {
                public: true,
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
                content: () => import('../views/Public/SignIn'),
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
                content: () => import('../views/Public/FAQ'),
            },
            meta: {
                title: projectName + ' - FAQ',
                public: true,
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
                content: () => import('../views/User/Profile'),
            },
            meta: {
                title: projectName + ' - Profile',
                roles: [roles.user, roles.moderator, roles.admin],
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
            path: '/moderator',
            name: 'Marina Registrations',
            components: {
                appbar: () => import('../components/Bars/AppBar'),
                navbar: () => import('../components/Bars/NavBar'),
                footer: () => import('../components/Bars/FooterBar'),
                content: () => import('../views/Moderator/Requests'),
            },
            meta: {
                title: projectName + ' - Marina Registrations',
                roles: [roles.moderator],
                metaTags: [
                    {
                        name: 'description',
                        content: 'Moderators page.'
                    },
                    {
                        property: 'og:description',
                        content: 'Moderators page.'
                    }
                ]
            },
        },
        {
            path: '/',
            name: 'Role',
            components: {
                appbar: () => import('../components/Bars/AppBar'),
                navbar: null,
                footer: () => import('../components/Bars/FooterBar'),
                content: () => import('../views/User/Role'),
            },
            meta: {
                title: projectName + ' - Role',
                roles: new Array(roles.user),
                metaTags: [
                    {
                        name: 'description',
                        content: 'Page.'
                    },
                    {
                        property: 'og:description',
                        content: 'Page.'
                    }
                ]
            }
        },
        {
            path: '/marina-registration',
            name: 'Marina Registration',
            components: {
                appbar: () => import('../components/Bars/AppBar'),
                navbar: null,
                footer: () => import('../components/Bars/FooterBar'),
                content: () => import('../views/Dockmaster/MarinaRegistration'),
            },
            meta: {
                title: projectName + ' - Marina Registration',
                roles: new Array(roles.user),
                metaTags: [
                    {
                        name: 'description',
                        content: 'Page.'
                    },
                    {
                        property: 'og:description',
                        content: 'Page.'
                    }
                ]
            }
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            components: {
                appbar: () => import('../components/Bars/AppBar'),
                navbar: () => import('../components/Bars/NavBar'),
                footer: () => import('../components/Bars/FooterBar'),
                content: () => import('../views/Dockmaster/Dashboard'),
            },
            meta: {
                title: projectName + ' - Dashboard',
                roles: new Array(roles.user),
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
                roles: new Array(roles.user),
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
            name: 'Booking requests',
            components: {
                appbar: () => import('../components/Bars/AppBar'),
                navbar: () => import('../components/Bars/NavBar'),
                footer: () => import('../components/Bars/FooterBar'),
                content: () => import('../views/Dockmaster/Requests'),
            },
            meta: {
                title: projectName + ' - Booking requests',
                roles: new Array(roles.user),
                metaTags: [
                    {
                        name: 'description',
                        content: 'Booking requests page.'
                    },
                    {
                        property: 'og:description',
                        content: 'Booking requests page.'
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
                roles: new Array(roles.user),
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
                roles: new Array(roles.user),
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
                roles: new Array(roles.user),
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
                content: () => import('../views/Public/FourOFour'),
            },
            meta: {
                title: projectName + ' - 404 Not Found',
                roles: [roles.user, roles.moderator, roles.admin],
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
            redirect: '/404',
            meta: {
                roles: [roles.user, roles.moderator, roles.admin],
            }
        }
    ];

export default routes