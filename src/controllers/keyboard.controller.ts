export const keyboard = (value: string) => {
    const key = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value,
        isDown: false,
        isUp: true,
        press: () => {
            key.isDown = true
            key.isUp = false
        },
        release: () => {
            key.isDown = false
            key.isUp = true
        },
        downHandler: (event: KeyboardEvent) => {
            if (event.code === key.value) {
                if (key.isUp) { key.press() }
                event.preventDefault()
            }
        },
        upHandler: (event: KeyboardEvent) => {
            if (event.code === key.value) {
                if (key.isUp) { key.release() }
                event.preventDefault()
            }
        },
        unsubscribe: () => {
            window.removeEventListener("keydown", downListener)
            window.removeEventListener("keyup", upListener)
        }
    }

    const downListener = key.downHandler.bind(key)
    const upListener = key.upHandler.bind(key)

    window.addEventListener("keydown", downListener, false)
    window.addEventListener("keyup", upListener, false)

    return key
}
