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
const roles = store.state.roles;
const boater = store.state.usertypes.boater;
const dockmaster = store.state.usertypes.dockmaster;
const newUser = store.state.usertypes.newUser;

const navbar = () => import('../components/AppComponents/NavBar');
const footer = () => import('../components/AppComponents/FooterBar');
const appBar = () => import('../components/AppComponents/AppBar');

const routes =
    [
        {
            path: '/',
            name: 'Berthy',
            components: {
                appbar: appBar,
                navbar: navbar,
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
                navbar: navbar,
                footer: footer,
                content: () => import('../views/User/Marina'),
            },
            meta: {
                roles: [roles.user, roles.moderator],
                usertype: [dockmaster, boater, newUser],
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
                navbar: navbar,
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
                navbar: navbar,
                footer: footer,
                content: () => import('../views/User/Profile'),
            },
            meta: {
                title: projectName + ' - Profile',
                roles: [roles.user],
                usertype: [dockmaster, boater],
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
            name: 'Marina Applications',
            components: {
                appbar: appBar,
                navbar: null,
                footer: footer,
                content: () => import('../views/Moderator/Applications'),
            },
            meta: {
                title: projectName + ' - Marina Applications',
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
                navbar: null,
                footer: footer,
                content: () => import('../views/User/Role'),
            },
            meta: {
                title: projectName + ' - Role',
                roles: [roles.user],
                usertype: [newUser],
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
                navbar: navbar,
                footer: footer,
                content: () => import('../views/Dockmaster/MarinaRegistration'),
            },
            meta: {
                title: projectName + ' - Marina Registration',
                roles: [roles.user],
                usertype: [dockmaster, newUser],
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
                navbar: navbar,
                footer: footer,
                content: () => import('../views/Dockmaster/Dashboard'),
            },
            meta: {
                title: projectName + ' - Dashboard',
                roles: [roles.user],
                usertype: [dockmaster],
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
                navbar: navbar,
                footer: footer,
                content: () => import('../views/User/Messages'),
            },
            meta: {
                title: projectName + ' - Messages',
                roles: [roles.user, roles.moderator],
                usertype: [boater, dockmaster],
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
            path: '/bookings',
            name: 'Booking requests',
            components: {
                appbar: appBar,
                navbar: navbar,
                footer: footer,
                content: () => import('../views/Dockmaster/Bookings'),
            },
            meta: {
                title: projectName + ' - Booking requests',
                roles: [roles.user],
                usertype: [dockmaster],
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
                navbar: navbar,
                footer: footer,
                content: () => import('../views/Dockmaster/Team'),
            },
            meta: {
                title: projectName + ' - Team',
                roles: [roles.user],
                usertype: [dockmaster],
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
                navbar: navbar,
                footer: footer,
                content: () => import('../views/Dockmaster/Settings'),
            },
            meta: {
                title: projectName + ' - Settings',
                roles: [roles.user],
                usertype: [dockmaster],
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
                navbar: null,
                footer: footer,
                content: () => import('../views/Boater/Book'),
            },
            meta: {
                title: projectName + ' - Book',
                roles: [roles.user],
                usertype: [boater, newUser],
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
            path: '/trips',
            name: 'Trips',
            components: {
                appbar: appBar,
                navbar: null,
                footer: footer,
                content: () => import('../views/Boater/Trips'),
            },
            meta: {
                title: projectName + ' - Trips',
                roles: [roles.user],
                usertype: [boater],
                metaTags: [
                    {
                        name: 'description',
                        content: 'My trips.'
                    },
                    {
                        property: 'og:description',
                        content: 'My trips.'
                    }
                ]
            },
        },
        {
            path: '/404',
            name: 'NotFound',
            components: {
                appbar: appBar,
                navbar: navbar,
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
            path: '/failurePayment',
            name: 'Payment failure',
            components: {
                appbar: appBar,
                navbar: null,
                footer: footer,
                content: () => import('../views/User/PaymentFailure'),
            },
            meta: {
                title: projectName + ' - Payment failure',
                roles: [roles.user],
                usertype: [boater],
                metaTags: [
                    {
                        name: 'description',
                        content: 'Payment failure.'
                    },
                    {
                        property: 'og:description',
                        content: 'Payment failure.'
                    }
                ]
            },
        },
        {
            path: '/successPayment',
            name: 'Payment success',
            components: {
                appbar: appBar,
                navbar: null,
                footer: footer,
                content: () => import('../views/User/PaymentSuccess'),
            },
            meta: {
                title: projectName + ' - Payment success',
                roles: [roles.user],
                usertype: [boater],
                metaTags: [
                    {
                        name: 'description',
                        content: 'Payment success.'
                    },
                    {
                        property: 'og:description',
                        content: 'Payment success.'
                    }
                ]
            },
        },
        {
            path: '*',
            redirect: '/404'
        }
    ];

export default routes