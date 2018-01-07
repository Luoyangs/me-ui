<template>
	<transition name="confirm-fade">
		<div class="confirm-wrapper" v-show="visible" @click.self="handleWrapperClick" role="dialog">
			<div class="confirm">
				<div class="confirm-header" v-if="title !== undefined">{{title}}</div>
				<div class="confirm-content" v-if="message !== ''">
					<div class="confirm-status">
						<i class="me-icons" :class="'me-icon-'+type"></i>
					</div>
					<div class="confirm-message">
						{{message}}
					</div>
				</div>
				<div class="confirm-btns">
					<me-button type="primary" @click.native="handleAction('cancel')" size="small" v-show="cancelButtonText" plain>{{cancelButtonText}}</me-button>
  				<me-button type="success" @click.native="handleAction('confirm')" size="small" v-show="confirmButtonText" plain>{{confirmButtonText}}</me-button>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	import Popup from '../../../src/utils/popup';
	import Dialog from '../../../src/utils/aria-dialog';
	import {addClass,removeClass} from '../../../utils/dom';
	import MeButton from '../../button';

	let confirm;

	export default {
		mixins: [Popup],
		props: {
			modal: {
				default: true
			},
			lockScroll: {
				default: true
			}
		},
		data() {
      return {
        uid: 1,
        title: undefined,
        message: '',
        type: '',
        action: '',
        confirmButtonText: '',
        cancelButtonText: '',
        callback: null,
        focusAfterClosed: null
      };
    },
		components: {
			MeButton
		},
		methods: {
			getSafeClose(){
				const curId = this.uid;
				return function() {
					this.$nextTick(() => {
						if(curId === this.uid) this.doClose();
					});
				};
			},
			doClose() {
				if(!this.visible) return;
				this.visible = false;
				this._closing = true;

				this.onClose && this.onClose();
				confirm.closeDialog();

				if(this.lockScroll){
					setTimeout(() => {
						if(this.modal && this.bodyOverflow !== 'hidden'){
							document.body.style.overflow = this.bodyOverflow;
							document.body.style.paddingRight = this.bodyPaddingRight;
						}
						this.bodyOverflow = null;
						this.bodyPaddingRight = null;
					}, 200);
				}
				this.speed = false;

				if(!this.transition){
					this.doAfterClose();
				}
				setTimeout(() => {
					this.action && this.callback(this.action,this);
				},20);
			},
			handleWrapperClick(){
				this.handleAction('cancel');
			},
			handleAction(action){
				this.action = action;
				if(typeof this.beforeClose === 'function'){
					this.close = this.getSafeClose();
					this.beforeClose(action,this,this.close);
				}else{
					this.doClose();
				}
			},
			getFistFocus(){
				const $btns = this.$el.querySelector('.confirm-btns .me-button');
        return $btns && $btns[0];
			}
		},
		watch: {
			visible(val) {
				if(val) {
					this.uid++;
					this.$nextTick(() => {
						this.refs.confirm.$el.focus();
					});
					this.focusAfterClosed = document.activeElement;
          messageBox = new Dialog(this.$el, this.focusAfterClosed, this.getFistFocus());
				}
			}
		},
		mounted(){
			window.addEventListener('hashchange',this.close);
		},
		beforeDestroy() {
      window.removeEventListener('hashchange', this.close);
      setTimeout(() => {
        messageBox.closeDialog();
      });
    }
	}
</script>