/******************************************************************************
 * Copyright (c) - 2020 - Mikhail Shubov.                                     *
 * Berthy project. All Rights Reserved.                                       *
 * The code in routes.js is proprietary and confidential.                     *
 * Unauthorized copying of the file and any parts of it                       *
 * as well as the project itself is strictly prohibited.                      *
 * Written by Mikhail Shubov <mpshubov@gmail.com>, 4 / 2020                   *
 ******************************************************************************/
import store from '../store';

const projectName = 'Berthy';
const pagesWithNavBar = store.state.pagesWithNavBar;
const roles = store.state.roles;

const navbar = () => import('../components/Bars/NavBar');
const footer = () => import('../components/Bars/FooterBar');
const appBar = () => import('../components/Bars/AppBar');

const routes =
    [
        {
            path: '/',
            name: 'Berthy',
            components: {
                appbar: appBar,
                navbar: pagesWithNavBar.includes('Berthy') ? navbar : null,
                footer: footer,
                content: () => import('../views/Public/LandingPage'),
            },
            meta: {
                public: true,
                title: projectName,
                metaTags: [
                    {
                        name: 'description',
                        content: 'Landing Page.'
                    },
                    {
                        property: 'og:description',
                        content: 'Landing Page.'
                    }
                ]
            }
        },
        {
            path: '/marina/:id',
            name: 'Marina',
            components: {
                appbar: appBar,
                navbar: pagesWithNavBar.includes('Marina') ? navbar : null,
                footer: footer,
                content: () => import('../views/User/Marina'),
            },
            meta: {
                roles: [roles.user, roles.moderator, roles.admin],
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
                navbar: pagesWithNavBar.includes('Sign Up') ? navbar : null,
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
                navbar: pagesWithNavBar.includes('Sign In') ? navbar : null,
                footer: null,
                content: () => import('../views/Public/SignIn'),
            },
            meta: {
                public: true,
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
            name: 'Frequently Asked Questions',
            components: {
                appbar: appBar,
                navbar: pagesWithNavBar.includes('Frequently Asked Questions') ? navbar : null,
                footer: footer,
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
                appbar: appBar,
                navbar: pagesWithNavBar.includes('Profile') ? navbar : null,
                footer: footer,
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
                appbar: appBar,
                navbar: pagesWithNavBar.includes('Marina Registrations') ? navbar : null,
                footer: footer,
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
            path: '/roles',
            name: 'Role',
            components: {
                appbar: appBar,
                navbar: pagesWithNavBar.includes('Role') ? navbar : null,
                footer: footer,
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
                appbar: appBar,
                navbar: pagesWithNavBar.includes('Marina Registration') ? navbar : null,
                footer: footer,
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
                appbar: appBar,
                navbar: pagesWithNavBar.includes('Dashboard') ? navbar : null,
                footer: footer,
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
                appbar: appBar,
                navbar: pagesWithNavBar.includes('Messages') ? navbar : null,
                footer: footer,
                content: () => import('../views/User/Messages'),
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
                appbar: appBar,
                navbar: pagesWithNavBar.includes('Booking requests') ? navbar : null,
                footer: footer,
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
                appbar: appBar,
                navbar: pagesWithNavBar.includes('Team') ? navbar : null,
                footer: footer,
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
                appbar: appBar,
                navbar: pagesWithNavBar.includes('Settings') ? navbar : null,
                footer: footer,
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
                appbar: appBar,
                navbar: pagesWithNavBar.includes('Book') ? navbar : null,
                footer: footer,
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
                appbar: appBar,
                navbar: pagesWithNavBar.includes('NotFound') ? navbar : null,
                footer: footer,
                content: () => import('../views/Public/FourOFour'),
            },
            meta: {
                public: true,
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