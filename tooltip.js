 (function() {
      class GenericTooltip {
        constructor(config = {}) {
          this.speed = config.speed || 60;
          this.selector = config.selector || '[data-tooltip], [data-tooltip-html]';
          this.tooltip = null;
          this.currentElement = null;
          this.isMouseOverTooltip = false;
          this.init();
        }

        init() {
          document.querySelectorAll(this.selector).forEach(el => {
            const showOn = el.getAttribute('data-show') || 'click';

            if (showOn === 'hover') {
              el.addEventListener('mouseenter', () => this.handleMouseEnter(el));
              el.addEventListener('mouseleave', () => this.handleMouseLeave(el));
            } else {
              el.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleClick(el);
              });
            }
          });

          document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.generic-tooltip')) {
              this.isMouseOverTooltip = true;
            }
          });

          document.addEventListener('mouseout', (e) => {
            if (e.target.closest('.generic-tooltip')) {
              this.isMouseOverTooltip = false;
            }
          });

          document.addEventListener('click', (e) => {
            const clickedOnElement = e.target.matches(this.selector);
            const clickedOnTooltip = e.target.closest('.generic-tooltip');
            if (!clickedOnElement && !clickedOnTooltip) {
              this.hideTooltip();
            }
          });

          window.addEventListener('resize', this.updatePosition.bind(this));
          window.addEventListener('scroll', this.updatePosition.bind(this));
        }

        handleMouseEnter(el) {
          this.showTooltip(el);
          this.currentElement = el;
        }

        handleMouseLeave(el) {
          if (!this.isMouseOverTooltip) {
            this.hideTooltip();
          }
        }

        handleClick(el) {
          if (this.currentElement === el) {
            this.hideTooltip();
          } else {
            this.showTooltip(el);
            this.currentElement = el;
          }
        }

        updatePosition() {
          if (this.tooltip && this.currentElement) {
            this.positionTooltip(this.currentElement);
          }
        }

        showTooltip(el) {
          this.removeTooltip();

          const html = el.getAttribute('data-tooltip-html');
          const text = el.getAttribute('data-tooltip');
          if (!html && !text) return;

          const tooltipEl = document.createElement('div');
          tooltipEl.classList.add('generic-tooltip');
          document.body.appendChild(tooltipEl);
          this.tooltip = tooltipEl;

          if (html) {
            tooltipEl.innerHTML = html;
            tooltipEl.classList.add('generic-tooltip-html');
            this.positionTooltip(el);
            requestAnimationFrame(() => {
              tooltipEl.classList.add('show');
            });
            return;
          }

          let i = 0;
          const type = () => {
            if (!document.body.contains(tooltipEl)) return;
            tooltipEl.textContent = text.slice(0, i);
            if (i < text.length) {
              i++;
              setTimeout(type, this.speed);
            }
          };

          this.positionTooltip(el);
          requestAnimationFrame(() => {
            tooltipEl.classList.add('show');
            type();
          });
        }

        positionTooltip(el) {
          if (!this.tooltip || !el) return;

          const rect = el.getBoundingClientRect();
          const tooltipRect = this.tooltip.getBoundingClientRect();
          const scrollY = window.scrollY || window.pageYOffset;
          const scrollX = window.scrollX || window.pageXOffset;

          let left = rect.left + scrollX;
          let top = rect.top + scrollY - tooltipRect.height - 8;

          if (left + tooltipRect.width > window.innerWidth) {
            left = window.innerWidth - tooltipRect.width - 10;
          }
          left = Math.max(10, left);

          if (top < 10) {
            top = rect.bottom + scrollY + 8;
          }

          this.tooltip.style.left = `${left}px`;
          this.tooltip.style.top = `${top}px`;
        }

        hideTooltip() {
          if (this.tooltip) {
            this.tooltip.classList.remove('show');
            setTimeout(() => this.removeTooltip(), 200);
            this.currentElement = null;
          }
        }

        removeTooltip() {
          if (this.tooltip) {
            this.tooltip.remove();
            this.tooltip = null;
          }
        }
      }

      new GenericTooltip();
    })();