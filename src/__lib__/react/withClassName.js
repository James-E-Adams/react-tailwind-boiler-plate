import React from "react";
import classnames from "classnames";
import withProps from "recompose/withProps";
import withPropsOnChange from "recompose/withPropsOnChange";

const isObject = value =>
  typeof value === "object" && !Array.isArray(value) && value !== null;

const mapClassName = (className, props) =>
  typeof className === "function" ? className(props) : className;

const classNameWithProp = (className, name, props) =>
  classnames(props[name], className);

const classNamePropsFy = classNames => props =>
  Object.keys(classNames).reduce(
    (classNameProps, name) => ({
      ...classNameProps,
      [name]: classNameWithProp(
        mapClassName(classNames[name], props),
        name,
        props
      )
    }),
    {}
  );

const normalizeClassNames = (classNames, name) =>
  isObject(classNames) ? classNames : { [name || "className"]: classNames };

const withClassName = (classNames, name) =>
  withProps(classNamePropsFy(normalizeClassNames(classNames, name)));

export const childWithClassName = (classNames, name) => child => ({
  ...child,
  props: {
    ...child.props,
    ...classNamePropsFy(normalizeClassNames(classNames, name))(child.props)
  }
});

export const elementWithClassName = (classNames, element) => props =>
  React.createElement(element || "div", {
    ...props,
    ...classNamePropsFy(normalizeClassNames(classNames))(props)
  });

export const withClassNameOnChange = (props, classNames, name) =>
  withPropsOnChange(
    props,
    classNamePropsFy(normalizeClassNames(classNames, name))
  );

export default withClassName;
