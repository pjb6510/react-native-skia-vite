import { HostConfig } from "react-reconciler";
import { DefaultEventPriority } from "react-reconciler/constants";

import { Node } from "../dom/types/Node";
import { NodeType } from "../dom/types/NodeType";
import { Container } from "./Container";
import { createNode } from "./HostComponents";
import { shallowEquals } from "./typeddash";

type Instance = Node<unknown>;

type Props = object;
type TextInstance = Node<unknown>;
type SuspenseInstance = Instance;
type HydratableInstance = Instance;
type PublicInstance = Instance;
type HostContext = null;
type UpdatePayload = Container;
type ChildSet = unknown;
type TimeoutHandle = ReturnType<typeof setTimeout>;
type NoTimeout = -1;

type SkiaHostConfig = HostConfig<
  NodeType,
  Props,
  Container,
  Instance,
  TextInstance,
  SuspenseInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout
>;

const DEBUG = false;
export const debug = (...args: Parameters<typeof console.log>) => {
  if (DEBUG) {
    console.log(...args);
  }
};

const appendChild = (parent: Instance, child: Instance) => {
  parent.addChild(child);
};

const removeChild = (parent: Instance, child: Instance) => {
  parent.removeChild(child);
};

const insertBefore = (
  parent: Instance,
  child: Instance,
  beforeChild: Instance
) => {
  parent.insertChildBefore(child, beforeChild);
};

export const skHostConfig: SkiaHostConfig = {
  supportsMutation: true,
  isPrimaryRenderer: false,
  supportsPersistence: false,
  supportsHydration: false,

  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,

  appendChild(parent, child) {
    debug("appendChild", parent, child);
    appendChild(parent, child);
  },
  appendChildToContainer(container, child) {
    debug("appendChildToContainer", container, child);
    appendChild(container.root, child);
  },

  getRootHostContext() {
    debug("getRootHostContext");
    return null;
  },
  getChildHostContext() {
    debug("getChildHostContext");
    return null;
  },

  shouldSetTextContent() {
    return false;
  },
  createTextInstance() {
    throw new Error("Text nodes are not supported");
  },

  createInstance(type, props, rootContainer) {
    return createNode(rootContainer, type, props);
  },

  appendInitialChild(parent, child) {
    debug("appendInitialChild", parent, child);
    appendChild(parent, child);
  },
  finalizeInitialChildren(parentInstance) {
    debug("finalizeInitialChildren", parentInstance);
    return false;
  },

  commitMount() {
    debug("commitMount");
  },
  prepareForCommit(container) {
    debug("prepareForCommit", container);
    return null;
  },
  resetAfterCommit(container) {
    debug("resetAfterCommit", container);
    container.redraw();
  },

  getPublicInstance(node: Instance) {
    debug("getPublicInstance", node);
    return node;
  },

  prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance) {
    debug("prepareUpdate", instance, type, oldProps, newProps);
    const isPropEqual = shallowEquals(oldProps, newProps);
    if (isPropEqual) {
      return null;
    }
    debug("update", type);
    return rootContainerInstance;
  },
  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    debug("commitUpdate", instance, updatePayload, type, oldProps, newProps);
    instance.setProps(newProps);
  },
  commitTextUpdate() {
    debug("commitTextUpdate");
  },

  clearContainer(container) {
    debug("clearContainer");
    container.root.children().forEach((child) => {
      container.root.removeChild(child);
    });
  },
  removeChild(parent, child) {
    debug("removeChild", parent, child);
    parent.removeChild(child);
  },
  removeChildFromContainer(container, child) {
    debug("removeChildFromContainer", container, child);
    removeChild(container.root, child);
  },

  insertBefore(parent, child, beforeChild) {
    debug("insertBefore", parent, child, beforeChild);
    parent.insertChildBefore(child, beforeChild);
  },
  insertInContainerBefore(container, child, beforeChild) {
    debug("insertInContainerBefore", container, child, beforeChild);
    insertBefore(container.root, child, beforeChild);
  },

  getCurrentEventPriority() {
    return DefaultEventPriority;
  },
  beforeActiveInstanceBlur: () => {},
  afterActiveInstanceBlur: () => {},
  detachDeletedInstance: () => {},

  getInstanceFromNode() {
    debug("getInstanceFromNode");
    return null;
  },
  getInstanceFromScope() {
    debug("getInstanceFromScope");
    return null;
  },
  preparePortalMount() {
    debug("preparePortalMount");
  },
  prepareScopeUpdate() {
    debug("prepareScopeUpdate");
  },
};
