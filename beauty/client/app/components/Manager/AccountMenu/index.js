/**
 *
 * AccountMenu
 *
 */

import React, { useEffect } from 'react';

import { NavLink } from 'react-router-dom';
import { Collapse, Navbar } from 'reactstrap';

import Button from '../../Common/Button';

const AccountMenu = props => {
  const {
    user, isMenuOpen,
    links, toggleMenu,
    routeType, setDashboardRouter
  } = props;
  const currentRoute = `/${window.location.href.split('dashboard')[1]?.split('/')[1]}`;
  let routes = '/dashboard'
  if (currentRoute !== '/undefined') {
    routes = currentRoute
  }

  const getAllowedProvider = link => {
    if (!link.provider) return true;

    const userProvider = user.provider ?? '';
    if (!userProvider) return true;

    return link.provider.includes(userProvider);
  };

  return (
    <div className='panel-sidebar'>
      <Button
        text='Dashboard Menu'
        className={`${isMenuOpen ? 'menu-panel' : 'menu-panel'}`}
        ariaExpanded={isMenuOpen ? 'true' : 'false'}
        // ariaLabel={isMenuOpen ? 'dashboard menu expanded' : 'dashboard menu collapse'}
        onClick={toggleMenu}
      />
      <h3 className='panel-title text-xl'>Quick access</h3>
      <Navbar color='light' light expand='md'>
        <Collapse isOpen={isMenuOpen} navbar className='visible'>
          <ul className='panel-links'>
            {links.map((link, index) => {
              const PREFIX = link.prefix ? link.prefix : '';
              const isProviderAllowed = getAllowedProvider(link);
              const linkTo = link.to !== "" ? link.to === '/orders/customers' ? '/orders' : link.to : '/dashboard';
              const matchedRouteType = routes === linkTo

              if (!isProviderAllowed) return;
              return (
                <li key={index}>
                  <NavLink
                    to={PREFIX + link.to}
                    className={`${matchedRouteType ? 'text-white bg-signature rounded-[5px]' : ''}`}
                    onClick={() => {
                      toggleMenu()
                      setDashboardRouter(routes)
                    }}
                  >
                    {link.icon && <i className={`${link.icon} menu-icon`} aria-hidden="true"></i>}
                    {link.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AccountMenu;
