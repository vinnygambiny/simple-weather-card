export const handleClick = (node, hass, config, actionConfig) => {
  let e;
  switch (actionConfig.action) {
    case 'more-info':
      e = new Event('hass-more-info', { composed: true });
      e.detail = { entityId: actionConfig.entity || config.entity };
      node.dispatchEvent(e);
      break;
    case 'navigate':
      if (!actionConfig.navigation_path) return;
      history.pushState(null, '', actionConfig.navigation_path);
      e = new Event('location-changed', { composed: true });
      e.detail = { replace: false };
      window.dispatchEvent(e);
      break;
    case 'call-service':
      if (!actionConfig.service) return;
      const [ domain, service ] = actionConfig.service.split(".", 2);
      const serviceData = { ...actionConfig.service_data };
      hass.callService(domain, service, serviceData);
      break;
    case "fire-dom-event":
      const event = new Event('ll-custom', {
        composed: true,
        bubbles: true,
      });
      event.detail = actionConfig;
      node.dispatchEvent(event);
      break;
  }
};
