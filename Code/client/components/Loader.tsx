interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export default function Loader({ message = 'Loading...', fullScreen = true }: LoaderProps) {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50' : 'h-96'}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="lds-roller" role="status" aria-label="Loading">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {message && (
          <div className="text-gray-600 font-medium animate-pulse">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
