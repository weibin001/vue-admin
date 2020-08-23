function debounce(
  fn: Function,
  wait: number,
  options?: { trailing?: boolean; leading?: boolean; maxWait?: number }
): Function {
  let lastArgs: any[] | undefined, lastThis: any, lastCallTime: number, timerId: number | undefined, result: any

  const trailing: boolean = (options && options.trailing) || false
  const leading: boolean = (options && options.trailing) || false
  const maxing: number | undefined = options && 'maxWait' in options ? options.maxWait : undefined
  let lastInvokeTime: number

  function invokeFunc(time: number) {
    const args = lastArgs
    const thisArg = lastThis
    result = fn.apply(thisArg, args)
    lastThis = lastArgs = undefined
    lastInvokeTime = time
    return result
  }

  function sholdInvoke(time: number) {
    const lastCallSinceTime = time - (lastCallTime || 0)
    const lastInvokeSinceTime = time - (lastInvokeTime || 0)
    return !lastCallTime || lastCallSinceTime > wait || (maxing && lastInvokeSinceTime > maxing)
  }

  function startTimer(pendingFunc: Function, wait: number) {
    return setTimeout(pendingFunc, wait)
  }

  function remainWait(time: number) {
    const lastCallSinceTime = time - (lastCallTime || 0)
    const lastInvokeSinceTime = time - (lastInvokeTime || 0)
    const waitTime = wait - lastCallSinceTime

    return maxing ? Math.min(waitTime, wait - lastInvokeSinceTime) : wait
  }

  function trailingEdge(time: number) {
    timerId = undefined
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function timeExpired() {
    const time = Date.now()
    if (sholdInvoke(time)) {
      return trailingEdge(time)
    }
    timerId = startTimer(timeExpired, remainWait(time))
  }

  function leadingEdge(time: number) {
    timerId = startTimer(timeExpired, wait)
    return leading ? invokeFunc(time) : result
  }

  function debounced(this: any, ...args: any[]) {
    const time = Date.now()
    lastArgs = args
    lastThis = this
    lastCallTime = time
    const isInvoking = sholdInvoke(time)
    if (isInvoking) {
      if (!timerId) {
        return leadingEdge(time)
      }
      if (maxing) {
        timerId = startTimer(timeExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timeExpired, wait)
    }
    return result
  }
  return debounced
}

function throttle(fn: Function, wait: number, options?: { trailing?: boolean; leading?: boolean }) {
  return debounce(fn, wait, { ...options, maxWait: wait })
}

export default {
  debounce,
  throttle
}
