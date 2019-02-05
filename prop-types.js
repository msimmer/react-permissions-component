function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location) {
    const componentName_ = componentName || 'ANONYMOUS'
    if (props[propName] === null || typeof props[propName] === 'undefined') {
      const locationName = ReactPropTypeLocationNames[location]
      if (isRequired) {
        return new Error(
          `Required ${locationName} \`${propName}\` was not specified in (\`${componentName_}\`)`,
        )
      }
      return null
    } else {
      return validate(props, propName, componentName, location)
    }
  }

  let chainedCheckType = checkType.bind(null, false)
  chainedCheckType.isRequired = checkType.bind(null, true)

  return chainedCheckType
}

function permissionsPropType(props, propName, componentName, location) {
  const componentName_ = componentName || 'ANONYMOUS'
  const value = props[propName]

  if (!Number.isInteger(value)) {
    return new Error(
      `\`${propName}\`in \`${componentName}\` must be an integer`,
    )
  }

  if (String(value).length > 3) {
    return new Error(
      `\`${propName}\`in \`${componentName}\` must be made up of three consecutive integers`,
    )
  }

  if (/12389/.test(String(value))) {
    return new Error(
      `\`${propName}\`in \`${componentName}\` must only contain the numbers 4,5,6,7 and 0`,
    )
  }

  return null
}

export const permissionsPropType = createChainableTypeChecker(
  permissionsPropType,
)
