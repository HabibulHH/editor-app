import React, { Component,Fragment } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import {BoldMark,ItalicMark,ToolBar} from './index';
import Icon from 'react-icons-kit';
import {bold} from 'react-icons-kit/feather/bold';
import {italic} from 'react-icons-kit/feather/italic';


const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'You can change this line anytime',
              },
            ],
          },
        ],
      },
    ],
  },
})

class TextEditor extends Component {

  state = {
    value: initialValue,
  };
  ref = editor => {
    this.editor = editor
  }

  onKeyDown = (e,change) => {
    if(!e.ctrlKey) {return}
    e.preventDefault();

    switch(e.key) {
        case 'b' : {
            change.toggleMark('bold')
            return true;
        }
        case 'i' : {
            change.toggleMark('italic')
            return true;
        }
        default :{
            return true;
        }
    }
  }

  renderMark = props => {
      switch ( props.mark.type ) {
          case 'bold': {
            return <BoldMark  {...props} />
          }
          case 'italic' : {
           return <ItalicMark {...props} />
          }
      }
  }

  onChange = ({ value }) => {
    this.setState({ value })
  }

  
	onMarkClick = (e, type) => {
		e.preventDefault();
		const { value } = this.state;
		const change = this.editor.toggleMark(type);
		this.onChange(change);
	};
  render() {
    return (
            <Fragment>

              <ToolBar>
                  <button
                    onPointerDown={(e)=>{this.onMarkClick(e,'bold')}} 
                    className="tooltip-icon-button"
                  >
                    <Icon icon={bold}/>
                  </button>
                  <button 
                    onPointerDown={(e)=>{this.onMarkClick(e,'italic')}}
                    className="tooltip-icon-button"
                  >
                  <Icon icon={italic}/>
                </button>
              </ToolBar>

                <Editor 
                    value = {this.state.value} 
                    ref={this.ref}
                    onChange = {this.onChange}
                    onKeyDown = {this.onKeyDown}
                    renderMark = {this.renderMark}
                />
                
              </Fragment>
              );

            
  }
}

export default TextEditor;
