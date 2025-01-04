import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-emerald-500">404</h1>
                
                <div className="mt-8 mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Page not found
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Sorry, we couldn't find the page you're looking for.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2 text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
                    <div className="w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                </div>
            </div>
        </div>
    );
} 