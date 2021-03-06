/**
 * Init:
 *  - Endpoint services
 *  - Session field
 */
const API_URL = 'https://capstone.quanlm.com';
const ENDPOINT_HEATMAP_SERVICE = `${API_URL}/service-tracking/api/tracked-data`;
const ENDPOINT_CONVERSION_SERVICE = `${API_URL}/service-tracking/api/tracked-funnel-data`;

const SESSION_ID_FIELD = 'sessionID';
const SESSION_TRACKED_STEPS_FIELD = 'trackedSteps';

/**
 * Const weight for enum event
 */
const EVENT = {
  CLICK: 0,
  HOVER: 1,
  SCROLL: 2,
};

/**
 * Init event queues
 */
let CLICK_EVENT_QUEUE = [];
let HOVER_EVENT_QUEUE = [];
let SCROLL_EVENT_QUEUE = [];

/**
 * In ms, interval to push event to endpoint
 */
const CLICK_TIME = 5000;
const HOVER_TIME = 2000;
const SCROLL_TIME = 5000;
const FUNNEL_TIME = 1000;

/**
 * Init tracking url
 */
let trackingUrl = window.location.href;
const documentHeight = document.body.offsetHeight;

/**
 *  Init scroll
 */
let timer = new Date();

/**
 * Get selector of an element
 * @param {HTML element} node
 */
function getUniqueSelector(node) {
  let selector = '';
  while (node.parentElement) {
    const siblings = Array.from(node.parentElement.children).filter(function(
      element,
    ) {
      return element.tagName === node.tagName;
    });
    selector = `${
      siblings.indexOf(node)
        ? `${node.tagName}:nth-of-type(${siblings.indexOf(node) + 1})`
        : `${node.tagName}`
    }${selector ? ' > ' : ''}${selector}`;
    node = node.parentElement;
  }
  return `html > ${selector.toLowerCase()}`;
}

/**
 * Get offset of node
 * @param {HTML element} node
 */
function getDocumentOffsetPosition(node) {
  const position = {
    top: node.offsetTop,
    left: node.offsetLeft,
  };
  if (node.offsetParent) {
    const parentPosition = getDocumentOffsetPosition(node.offsetParent);
    position.top += parentPosition.top;
    position.left += parentPosition.left;
  }
  return position;
}

/**
 * Get valid target
 * @param {NODE} node
 */
function getTarget(node) {
  while (node) {
    const { offsetWidth: width, offsetHeight: height } = event.target;
    const { top: topTarget, left: leftTarget } = getDocumentOffsetPosition(
      node
    );

    if (topTarget, leftTarget, width, height) {
      return node;
    }

    node = node.parentElement;
  }
}

/**
 * Handle mouse event
 * @param {EVENT} eventType
 */
function handleMouse(eventType) {
  return function(event) {
    const { pageX, pageY } = event;
    const target = getTarget(event.target);
    const { offsetWidth: width, offsetHeight: height } = target;
    const { top: topTarget, left: leftTarget } = getDocumentOffsetPosition(target);
    const offsetX = pageX - leftTarget;
    const offsetY = pageY - topTarget;
    const selector = getUniqueSelector(target);

    const data = {
      selector,
      width,
      height,
      offsetX,
      offsetY,
    };

    switch (eventType) {
      case EVENT.HOVER:
        HOVER_EVENT_QUEUE.push(data);
        break;
      case EVENT.CLICK:
        CLICK_EVENT_QUEUE.push(data);
        break;
    }
  };
}

/**
 * Handle touch event
 * @param {EVENT} eventType
 */
function handleTouch(eventType) {
  return function(event) {
    const { pageX, pageY } = event.touches[0];
    const { offsetWidth: width, offsetHeight: height } = event.target;
    const { top: topTarget, left: leftTarget } = getDocumentOffsetPosition(
      event.target,
    );
    const offsetX = pageX - leftTarget;
    const offsetY = pageY - topTarget;
    const selector = getUniqueSelector(event.target);

    const data = {
      selector,
      width,
      height,
      offsetX,
      offsetY,
    };

    switch (eventType) {
      case EVENT.HOVER:
        HOVER_EVENT_QUEUE.push(data);
        break;
      case EVENT.CLICK:
        CLICK_EVENT_QUEUE.push(data);
        break;
    }
  };
}

function handleScroll(_) {
  const position = window.scrollY;
  const duration = (new Date() - timer) / 1000;
  timer = new Date();

  SCROLL_EVENT_QUEUE.push({ position, duration });
}

/**
 * Do push event
 * @param {*} queue
 * @param {*} eventType
 */
function pushEvent(eventType) {
  const xhttp = new XMLHttpRequest();
  try {
    if (eventType === EVENT.HOVER) {
      // HOVER_EVENT_QUEUE = HOVER_EVENT_QUEUE.filter(function(_, index) {
      //   return index % 5 == 1;
      // });
    }

    let queue;
    if (eventType === EVENT.HOVER) {
      queue = HOVER_EVENT_QUEUE;
    } else if (eventType == EVENT.CLICK) {
      queue = CLICK_EVENT_QUEUE;
    } else if (eventType == EVENT.SCROLL) {
      queue = SCROLL_EVENT_QUEUE;
    }

    if (!queue || queue.length === 0) {
      return;
    }

    const sessionID = sessionStorage.getItem(SESSION_ID_FIELD);
    const requestBody = {
      trackingUrl,
      eventType,
      webID: window.webID,
      sessionID: sessionID
        ? sessionID
        : `${new Date().getTime().toString()}-${navigator.userAgent}`,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      data:
        eventType == EVENT.SCROLL
          ? JSON.stringify({
              documentHeight,
              scroll: queue,
            })
          : JSON.stringify(queue),
    };

    xhttp.open('POST', ENDPOINT_HEATMAP_SERVICE);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.send(JSON.stringify(requestBody));
    if (eventType === EVENT.HOVER) {
      HOVER_EVENT_QUEUE = [];
    } else if (eventType == EVENT.CLICK) {
      CLICK_EVENT_QUEUE = [];
    } else if (eventType == EVENT.SCROLL) {
      SCROLL_EVENT_QUEUE = [];
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * function to set interval to push event
 * @param {*} time
 * @param {*} eventType
 */
function setEventInterval(time, eventType) {
  setInterval(function() {
    pushEvent(eventType);
  }, time);
}

/**
 * Set interval
 */
setEventInterval(CLICK_TIME, EVENT.CLICK);
setEventInterval(HOVER_TIME, EVENT.HOVER);
setEventInterval(SCROLL_TIME, EVENT.SCROLL);

/**
 * Listen events
 */
document.addEventListener('click', handleMouse(EVENT.CLICK));
document.addEventListener('mousemove', handleMouse(EVENT.HOVER));

document.addEventListener('touchstart', handleTouch(EVENT.CLICK));
document.addEventListener('touchmove', handleTouch(EVENT.HOVER));

document.addEventListener('scroll', handleScroll);

/**
 * Post conversion
 */
function postConversion() {
  const xhttp = new XMLHttpRequest();
  const sessionID = sessionStorage.getItem(SESSION_ID_FIELD);
  const trackedSteps = sessionStorage.getItem(SESSION_TRACKED_STEPS_FIELD);

  if (sessionID && trackedSteps) {
    const requestBody = {
      webID: window.webID,
      sessionID,
      trackedSteps,
    };

    xhttp.open('POST', ENDPOINT_CONVERSION_SERVICE);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.send(JSON.stringify(requestBody));
  }
}

/**
 * Conversion Rate - Session Storage
 */
function pushCurrentUrl(trackingUrl) {
  const sessionID = sessionStorage.getItem(SESSION_ID_FIELD);
  const trackedSteps = sessionStorage.getItem(SESSION_TRACKED_STEPS_FIELD);
  if (!sessionID || !trackedSteps) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if (this.responseText === undefined || this.responseText === '') {
          return;
        }
        const ip = this.responseText;
        const sessionID = `${new Date().getTime()}-${ip}-${
          navigator.userAgent
        }`;
        const trackedSteps = [trackingUrl];
        sessionStorage.setItem(SESSION_ID_FIELD, sessionID);
        sessionStorage.setItem(
          SESSION_TRACKED_STEPS_FIELD,
          JSON.stringify(trackedSteps),
        );
        postConversion();
      }
    };
    xhttp.open('GET', 'https://api.ipify.org', true);
    xhttp.send();
  } else {
    const parsedTrackedSteps = JSON.parse(trackedSteps);
    parsedTrackedSteps.push(trackingUrl);
    sessionStorage.setItem(
      SESSION_TRACKED_STEPS_FIELD,
      JSON.stringify(parsedTrackedSteps),
    );
    postConversion();
  }
}

function checkCurrentUrl() {
  const nowHref = window.location.href;
  if (nowHref !== trackingUrl) {
    trackingUrl = nowHref;
    pushCurrentUrl(trackingUrl);
  }
}

setInterval(function() {
  checkCurrentUrl();
}, FUNNEL_TIME);

pushCurrentUrl(trackingUrl);

/**
 * Before closing
 */
window.addEventListener('beforeunload', function(event) {
  pushEvent(CLICK_EVENT_QUEUE, EVENT.CLICK);
  pushEvent(HOVER_EVENT_QUEUE, EVENT.HOVER);
  pushEvent(HOVER_EVENT_QUEUE, EVENT.SCROLL);
  checkCurrentUrl();
  return event;
});
