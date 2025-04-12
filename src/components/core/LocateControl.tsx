interface LocateControlProps {
    onClick: () => void
    isLocating: boolean
  }
  
  const LocateControl = ({ onClick, isLocating }: LocateControlProps) => {
    return (
      <a
        href="#"
        title="Определить мое местоположение"
        onClick={(e) => {
          e.preventDefault()
          onClick()
        }}
        style={{
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderRadius: '6px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
        }}
        className={isLocating ? 'text-gray-400' : 'text-green-600 hover:bg-gray-100'}
      >
        {isLocating ? (
          <div style={{
            width: '18px',
            height: '18px',
            border: '2px solid #ddd',
            borderTop: '2px solid #4CAF50',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ width: '22px', height: '22px' }}
          >
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        )}
  
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </a>
    )
  }
  
  export default LocateControl
  