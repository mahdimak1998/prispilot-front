import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    console.error('🚨 ErrorBoundary - getDerivedStateFromError:', error);
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🚨 ErrorBoundary - componentDidCatch:', {
      error: error.toString(),
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
  }

  public render() {
    if (this.state.hasError) {
      console.error('🚨 ErrorBoundary - Rendering fallback UI');
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
          <h2 className="text-xl font-semibold text-destructive mb-4">
            Noe gikk galt
          </h2>
          <p className="text-muted-foreground mb-4">
            Det oppstod en feil ved lasting av denne delen av appen.
          </p>
          <button
            onClick={() => {
              console.log('🔄 ErrorBoundary - Resetting error state');
              this.setState({ hasError: false, error: undefined });
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Prøv igjen
          </button>
          {this.state.error && (
            <details className="mt-4 text-left max-w-lg">
              <summary className="cursor-pointer text-sm text-muted-foreground">
                Tekniske detaljer
              </summary>
              <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto">
                {this.state.error.toString()}
                {this.state.error.stack && '\n\nStack:\n' + this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;