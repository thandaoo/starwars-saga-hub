interface Props {
  onClearSelection: () => void
}

const MobileNavBar = ({ onClearSelection }: Props) => {
  return (
    <div className='btm-nav border-t opacity-75 h-[var(--mobile-nav-footer-height)]'>
      <button
        className='btn btn-block border-0 rounded-none bg-primary-content text-white'
        onClick={onClearSelection}
      >
        Home
      </button>
    </div>
  )
}

export default MobileNavBar
