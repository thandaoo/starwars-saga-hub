import { useEffect, useState } from 'react'

function useScreenSize(breakpoint: number = 640): boolean {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= breakpoint)

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth >= breakpoint)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint])

  return isLargeScreen
}

export default useScreenSize
