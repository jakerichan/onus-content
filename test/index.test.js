import React from 'react';
import { mount } from 'enzyme';
import { GetContent, SetContent, Provider } from '../index';

let wrapper
let noop = () => {};

const Test = ({ children, ...props }) => (
  <SetContent id='test' {...props}>
    <heading>{children}</heading>
  </SetContent>
)

describe('GetContent / SetContent', () => {
  afterEach(() => {
    if (wrapper) wrapper.unmount();
  })

  it('inserts contents of SetContent into GetContent', () => {
    wrapper = mount(
      <Provider>
        <section>
          <article className='get-content'>
            <GetContent id='test' />
          </article>
          <article className='set-content'>
            <Test priority={0}>
              <div id='test-el'>Test</div>
            </Test>
          </article>
        </section>
      </Provider>
    )

    expect(wrapper.contains(<div id='test-el'>Test</div>)).toBe(true)
  });

  it('uses biggest priority value regardless of order', () => {
    wrapper = mount(
      <Provider>
        <section>
          <article className='get-content'>
            <GetContent id='test' />
          </article>
          <Test priority={2}>Two</Test>
          <Test priority={3}><div id='test-el' key={0}>Three</div></Test>
          <Test priority={0}>Zero</Test>
          <Test priority={1}>One</Test>
        </section>
      </Provider>
    )

    expect(wrapper.contains(<div id='test-el' key={0}>Three</div>)).toBe(true);
  });

  it('renders next lower priority when the highest unmounts', () => {
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = { showOne: true }
      }

      render() {
        return (
          <Provider>
            <section>
              <GetContent id='test' />
              <Test priority={0}>Zero</Test>
              {this.state.showOne ? <Test priority={1}>One</Test> : null}
            </section>
          </Provider>
        );
      }
    }
    wrapper = mount(<App />)
    expect(wrapper.find(GetContent).text()).toBe('One');
    wrapper.setState({ showOne: false })
    expect(wrapper.find(GetContent).text()).toBe('Zero');
  });

  it('renders new highest when it mounts', () => {
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = { showOne: false, showTwo: false }
      }

      render() {
        return (
          <Provider>
            <section>
              <GetContent id='test' />
              {this.state.showTwo ? <Test priority={2}>Two</Test> : null}
              <Test priority={0}>Zero</Test>
              {this.state.showOne ? <Test priority={1}>One</Test> : null}
            </section>
          </Provider>
        );
      }
    }

    wrapper = mount(<App />)
    expect(wrapper.find(GetContent).text()).toBe('Zero');
    wrapper.setState({ showOne: true })
    expect(wrapper.find(GetContent).text()).toBe('One');
    wrapper.setState({ showTwo: true })
    expect(wrapper.find(GetContent).text()).toBe('Two');
  });

  it('renders multiple GetContent components', () => {
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = { showOne: false, showTwo: false }
      }

      render() {
        return (
          <Provider>
            <section>
              <div className="first">
                <GetContent id='test' />
              </div>
              <Test priority={0}>Zero</Test>
              <Test priority={1}>One</Test>
              <div className="second">
                <GetContent id='test' />
              </div>
            </section>
          </Provider>
        );
      }
    }

    wrapper = mount(<App />)
    wrapper.find(GetContent).forEach((element) => {
      expect(element.text()).toBe('One');
    })
  })

  it('renders correct content when using multiple SetContent names', () => {
    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = { showOne: false, showTwo: false }
      }

      render() {
        return (
          <Provider>
            <section>
              <GetContent id='test' />
              <GetContent id='foo' />
              <Test priority={0}>Zero</Test>
              <Test priority={1}>One</Test>
              <SetContent id='foo' priority={2}>
                <span>FooBar</span>
              </SetContent>
            </section>
          </Provider>
        );
      }
    }

    wrapper = mount(<App />)
    wrapper.find(GetContent).forEach((element) => {
      if (element.prop('id') === 'foo') {
        expect(element.text()).toBe('FooBar');  
      } else {
        expect(element.text()).toBe('One');
      }
    })
  })

  it('appends rather than replacing content', () => {
    class App extends React.Component {
      state = { showOne: false, showTwo: true }

      render() {
        console.log('append test')
        return (
          <Provider>
            <section>
              <GetContent id='test' />
              {this.state.showTwo ? <Test priority={2} append>Two</Test> : null}
              <Test priority={0}>Zero</Test>
              {this.state.showOne ? <Test priority={1}>One</Test> : null}
            </section>
          </Provider>
        );
      }
    }

    wrapper = mount(<App />)
    expect(wrapper.find(GetContent).text()).toBe('ZeroTwo');
    wrapper.setState({ showOne: true })
    expect(wrapper.find(GetContent).text()).toBe('OneTwo');
  })

  // it('prepends rather than replacing content', () => {
  //   class App extends React.Component {
  //     constructor(props) {
  //       super(props)
  //       this.state = { showOne: false, showTwo: true }
  //     }

  //     render() {
  //       return (
  //         <Provider>
  //           <section>
  //             <GetContent id='test' />
  //             {this.state.showTwo ? <Test priority={2} prepend>Two</Test> : null}
  //             <Test priority={0}>Zero</Test>
  //             {this.state.showOne ? <Test priority={1}>One</Test> : null}
  //           </section>
  //         </Provider>
  //       );
  //     }
  //   }

  //   wrapper = mount(<App />)
  //   expect(wrapper.find(GetContent).text()).toBe('TwoZero');
  //   wrapper.setState({ showOne: true })
  //   expect(wrapper.find(GetContent).text()).toBe('TwoOne');
  // })

  it('replaces elements in the same priority', () => {
    class App extends React.Component {
      state = { showOne: true, showZero: false }

      render() {
        return (
          <Provider>
            <section>
              <GetContent id='test' />
              {this.state.showZero ? <Test priority={0}>Zero</Test> : null}
              {this.state.showOne ? <Test priority={0}>One</Test> : null}
            </section>
          </Provider>
        );
      }
    }

    wrapper = mount(<App />)
    expect(wrapper.find(GetContent).text()).toBe('One');
    wrapper.setState({ showOne: false, showZero: true });
    expect(wrapper.find(GetContent).text()).toBe('Zero');
  });
});