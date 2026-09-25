import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

type Props = {
    children: ReactNode;
};

type State = {
    hasError: boolean;
    error: Error | null;
    chunkError: boolean;
};

export class AppErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false, error: null, chunkError: false };

    static getDerivedStateFromError(error: Error): State {
        // Detect stale chunk errors after a new deploy
        const chunkError =
            error.name === "ChunkLoadError" ||
            /Loading chunk|Failed to fetch dynamically imported module/i.test(error.message);

        return { hasError: true, error, chunkError };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error("[AppErrorBoundary]", error, info.componentStack);
    }

    handleReload = () => {
        window.location.reload();
    };

    handleRetry = () => {
        this.setState({ hasError: false, error: null, chunkError: false });
    };

    render() {
        if (!this.state.hasError) return this.props.children;

        return (
            <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4">
                <div className="w-full max-w-md rounded-4xl border border-[#ebebeb] bg-white p-8 shadow-[0_24px_48px_rgba(23,23,23,0.04)] text-center">
                    <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#fafafa] border border-[#ebebeb]">
                        <FiAlertTriangle className="text-xl text-[#171717]" aria-hidden="true" />
                    </div>

                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8f8f8f]">
                        ShopSphere
                    </p>

                    <h1 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-[#171717]">
                        {this.state.chunkError ? "Update available" : "Something went wrong"}
                    </h1>

                    <p className="mt-3 text-sm leading-relaxed text-[#4d4d4d]">
                        {this.state.chunkError
                            ? "A newer version of the app is available. Reload to get the latest version."
                            : "An unexpected error occurred. You can try again or reload the page."}
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <button
                            type="button"
                            onClick={this.handleReload}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2b2b2b] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#171717]"
                        >
                            <FiRefreshCw className="text-sm" aria-hidden="true" />
                            Reload page
                        </button>

                        {!this.state.chunkError && (
                            <button
                                type="button"
                                onClick={this.handleRetry}
                                className="inline-flex items-center justify-center rounded-full border border-[#ebebeb] bg-white px-5 py-3 text-sm font-medium text-[#171717] transition hover:border-[#171717] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171717]"
                            >
                                Try again
                            </button>
                        )}
                    </div>

                    {import.meta.env.DEV && this.state.error && (
                        <details className="mt-6 text-left">
                            <summary className="cursor-pointer text-xs text-[#8f8f8f] hover:text-[#4d4d4d]">
                                Error details
                            </summary>
                            <pre className="mt-2 overflow-auto rounded-2xl bg-[#fafafa] p-3 text-[0.7rem] text-[#4d4d4d] border border-[#ebebeb]">
                                {this.state.error.stack}
                            </pre>
                        </details>
                    )}
                </div>
            </div>
        );
    }
}
