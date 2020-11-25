import React from 'react';

type BounderProps = {

}

type BounderState = {
  hasError: boolean
}
export class Bounder extends React.Component<BounderProps, BounderState> {
  constructor(props: BounderProps) {
    super(props);
  }

  state = {
    hasError: false
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.log('SYS_MESSAGE', error, errorInfo);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }


  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h3>Что то пошло не так :\</h3>
          <p>Перезагрузите страниуц</p>
        </div>
      );
    }

    return this.props.children;
  }
}