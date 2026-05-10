export default function ApplicationLogo({ 
    className = "h-10 w-auto",
    src = "/images/logo-undhari.png",
    alt = "UNDHARI",
    showText = true,
}) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <img 
                src={src} 
                alt={alt}
                className="h-full w-auto object-contain rounded-xl transition-all duration-500 hover:scale-105 flex-shrink-0"
                onError={(e) => {
                    console.error('Logo gagal dimuat:', src);
                    e.target.style.display = 'none';
                }}
            />
            {showText && (
                <div className="leading-tight flex-shrink-0">
                    <h1 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Asrama</h1>
                    <p className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">UNDHARI</p>
                </div>
            )}
        </div>
    );
}