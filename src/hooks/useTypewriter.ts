import { useEffect, useState } from 'react'

interface TypewriterOptions {
  typeSpeed?: number
  deleteSpeed?: number
  pauseMs?: number
  startDelay?: number
}

export function useTypewriter(words: string[], options: TypewriterOptions = {}) {
  const {
    typeSpeed = 60,
    deleteSpeed = 30,
    pauseMs = 1800,
    startDelay = 0,
  } = options

  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isReady, setIsReady] = useState(startDelay === 0)

  useEffect(() => {
    if (startDelay === 0) return
    const timeout = window.setTimeout(() => setIsReady(true), startDelay)
    return () => window.clearTimeout(timeout)
  }, [startDelay])

  useEffect(() => {
    if (!isReady || words.length === 0) return

    const activeWord = words[wordIndex]
    let timeout = 0

    if (!isDeleting) {
      if (text === activeWord) {
        timeout = window.setTimeout(() => setIsDeleting(true), pauseMs)
      } else {
        timeout = window.setTimeout(() => {
          setText(activeWord.slice(0, text.length + 1))
        }, typeSpeed)
      }
    } else if (text === '') {
      timeout = window.setTimeout(() => {
        setIsDeleting(false)
        setWordIndex(index => (index + 1) % words.length)
      }, 250)
    } else {
      timeout = window.setTimeout(() => {
        setText(activeWord.slice(0, text.length - 1))
      }, deleteSpeed)
    }

    return () => window.clearTimeout(timeout)
  }, [deleteSpeed, isDeleting, isReady, pauseMs, text, typeSpeed, wordIndex, words])

  return text
}