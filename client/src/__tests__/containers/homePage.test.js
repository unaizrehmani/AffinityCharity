import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { HomePageContainer } from '../../containers/homePage.js';

const mockStore = configureStore();

// Enzyme example
describe('Testing HomePage UI', () => {
  let fakeCauses = [
    {
      donors: [
        {
          causes: ['5dab3e297f1a0b006b7a36f6'],
          _id: '5db78d154a63eb006be56bcf',
          firstName: 'Zarif',
          lastName: 'Shahriar',
          email: 'zshah011@uottawa.ca',
          phone: '6138624299',
          address: '366 Oaklawn Crescent',
          createdDate: '2019-10-29T00:51:33.968Z'
        },
        {
          causes: ['5dab3e297f1a0b006b7a36f6'],
          _id: '5db08fc41edd3e006bf674d7',
          firstName: 'Ibrahim',
          lastName: 'Rehmani',
          email: 'unaizrehmani@gmail.com',
          phone: '6138624299',
          address: '366 Oaklawn Crescent',
          createdDate: '2019-10-23T17:37:08.034Z'
        }
      ],
      _id: '5dab3e297f1a0b006b7a36f6',
      name: 'Zakat',
      location: 'Global',
      deleteable: false,
      description: 'Zakat Global Fund',
      createdDate: '2019-10-19T16:47:37.990Z',
      imageID: 'production/causes/tkrd2ztab8fr7qi4ccod',
      mediaURL:
        'http://res.cloudinary.com/dmkd2a8op/image/upload/v1571505232/production/causes/tkrd2ztab8fr7qi4ccod.jpg',
      defaultDesign: {
        counters: {
          u_content_image: 4,
          u_content_text: 14,
          u_content_divider: 4,
          u_content_button: 4,
          u_column: 14,
          u_row: 11
        },
        body: {
          rows: [
            {
              cells: [1],
              columns: [
                {
                  contents: [
                    {
                      type: 'image',
                      values: {
                        containerPadding: '10px 10px 20px',
                        _meta: {
                          htmlID: 'u_content_image_1',
                          htmlClassNames: 'u_content_image'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        src: {
                          url:
                            'https://unroll-images-production.s3.amazonaws.com/projects/0/1572318080392-logo.png',
                          width: 431,
                          height: 117
                        },
                        fullWidth: false,
                        textAlign: 'center',
                        maxWidth: '100%',
                        altText: 'Image',
                        action: { url: '', target: '' }
                      }
                    }
                  ],
                  values: {
                    _meta: { htmlID: 'u_column_1', htmlClassNames: 'u_column' }
                  }
                }
              ],
              values: {
                columns: false,
                backgroundColor: 'rgba(255,255,255,0)',
                columnsBackgroundColor: 'rgba(255,255,255,0)',
                backgroundImage: {
                  url: '',
                  fullWidth: true,
                  repeat: false,
                  center: false,
                  cover: false
                },
                padding: '10px',
                hideDesktop: false,
                hideMobile: false,
                noStackMobile: false,
                _meta: { htmlID: 'u_row_1', htmlClassNames: 'u_row' },
                selectable: true,
                draggable: true,
                deletable: true
              }
            },
            {
              cells: [1],
              columns: [
                {
                  contents: [
                    {
                      type: 'text',
                      values: {
                        containerPadding: '10px 10px 5px',
                        _meta: {
                          htmlID: 'u_content_text_1',
                          htmlClassNames: 'u_content_text'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        color: '#000',
                        textAlign: 'center',
                        lineHeight: '120%',
                        linkStyle: {
                          inherit: true,
                          linkColor: '#0000ee',
                          linkHoverColor: '#0000ee',
                          linkUnderline: true,
                          linkHoverUnderline: true
                        },
                        text:
                          '<div><span style="color: #f10693; font-family: Pacifico, cursive; font-size: 14px; line-height: 16.8px;"><strong><span style="font-size: 80px; line-height: 96px;">Zakat - global</span></strong></span></div>'
                      }
                    },
                    {
                      type: 'text',
                      values: {
                        containerPadding: '10px',
                        _meta: {
                          htmlID: 'u_content_text_2',
                          htmlClassNames: 'u_content_text'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        color: '#000',
                        textAlign: 'center',
                        lineHeight: '120%',
                        linkStyle: {
                          inherit: true,
                          linkColor: '#0000ee',
                          linkHoverColor: '#0000ee',
                          linkUnderline: true,
                          linkHoverUnderline: true
                        },
                        text:
                          '<div><span style="color: #6fbb7b; font-family: Pacifico, cursive; font-size: 58px; text-align: center; line-height: 69.6px;">&nbsp;Your Summer Break</span></div>'
                      }
                    },
                    {
                      type: 'text',
                      values: {
                        containerPadding: '20px 10px 9px',
                        _meta: {
                          htmlID: 'u_content_text_3',
                          htmlClassNames: 'u_content_text'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        color: '#000',
                        textAlign: 'center',
                        lineHeight: '140%',
                        linkStyle: {
                          inherit: true,
                          linkColor: '#0000ee',
                          linkHoverColor: '#0000ee',
                          linkUnderline: true,
                          linkHoverUnderline: true
                        },
                        text:
                          '<div><span style="font-size: 24px; color: #505050; line-height: 33.6px;">Time to plan a vacation for your kids?</span></div>'
                      }
                    },
                    {
                      type: 'text',
                      values: {
                        containerPadding: '5px 10px 10px',
                        _meta: {
                          htmlID: 'u_content_text_4',
                          htmlClassNames: 'u_content_text'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        color: '#000',
                        textAlign: 'center',
                        lineHeight: '160%',
                        linkStyle: {
                          inherit: true,
                          linkColor: '#0000ee',
                          linkHoverColor: '#0000ee',
                          linkUnderline: true,
                          linkHoverUnderline: true
                        },
                        text:
                          '<div><span style="font-size: 18px; line-height: 28.8px;"><span style="color: #505050; font-size: 18px; line-height: 28.8px;">Check-out our summer break offers for&nbsp;</span><span style="color: #505050; font-size: 18px; line-height: 28.8px;">children who are creative, full of energy,&nbsp;</span><span style="color: #505050; font-size: 18px; line-height: 28.8px;">and can&rsquo;t sit still for a minute.</span></span></div>'
                      }
                    },
                    {
                      type: 'divider',
                      values: {
                        containerPadding: '20px',
                        _meta: {
                          htmlID: 'u_content_divider_1',
                          htmlClassNames: 'u_content_divider'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        width: '100%',
                        border: {
                          borderTopWidth: '1px',
                          borderTopStyle: 'solid',
                          borderTopColor: '#CCC'
                        },
                        textAlign: 'center'
                      }
                    }
                  ],
                  values: {
                    _meta: { htmlID: 'u_column_2', htmlClassNames: 'u_column' }
                  }
                }
              ],
              values: {
                columns: false,
                backgroundColor: 'rgba(255,255,255,0)',
                columnsBackgroundColor: 'rgba(255,255,255,0)',
                backgroundImage: {
                  url: '',
                  fullWidth: true,
                  repeat: false,
                  center: false,
                  cover: false
                },
                padding: '10px',
                hideDesktop: false,
                hideMobile: false,
                noStackMobile: false,
                _meta: { htmlID: 'u_row_2', htmlClassNames: 'u_row' },
                selectable: true,
                draggable: true,
                deletable: true
              }
            },
            {
              cells: [1],
              columns: [
                {
                  contents: [
                    {
                      type: 'text',
                      values: {
                        containerPadding: '20px',
                        _meta: {
                          htmlID: 'u_content_text_5',
                          htmlClassNames: 'u_content_text'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        color: '#000',
                        textAlign: 'left',
                        lineHeight: '120%',
                        linkStyle: {
                          inherit: true,
                          linkColor: '#0000ee',
                          linkHoverColor: '#0000ee',
                          linkUnderline: true,
                          linkHoverUnderline: true
                        },
                        text:
                          '<div><strong><span style="font-size: 30px; font-family: Montserrat, sans-serif; color: #2790d2; line-height: 36px;">Upcoming Events:</span></strong></div>'
                      }
                    }
                  ],
                  values: {
                    _meta: { htmlID: 'u_column_3', htmlClassNames: 'u_column' }
                  }
                }
              ],
              values: {
                columns: false,
                backgroundColor: 'rgba(255,255,255,0)',
                columnsBackgroundColor: 'rgba(255,255,255,0)',
                backgroundImage: {
                  url: '',
                  fullWidth: true,
                  repeat: false,
                  center: false,
                  cover: false
                },
                padding: '0px',
                hideDesktop: false,
                hideMobile: false,
                noStackMobile: false,
                _meta: { htmlID: 'u_row_3', htmlClassNames: 'u_row' },
                selectable: true,
                draggable: true,
                deletable: true
              }
            },
            {
              cells: [1, 2],
              columns: [
                {
                  contents: [
                    {
                      type: 'image',
                      values: {
                        containerPadding: '0px',
                        _meta: {
                          htmlID: 'u_content_image_2',
                          htmlClassNames: 'u_content_image'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        src: {
                          url:
                            'https://a.mailmunch.co/user_data/landing_pages/1500313461528-1.png',
                          width: 500,
                          height: 500
                        },
                        fullWidth: true,
                        textAlign: 'center',
                        maxWidth: '100%',
                        altText: 'Image',
                        action: { url: '', target: '' }
                      }
                    }
                  ],
                  values: {
                    _meta: { htmlID: 'u_column_4', htmlClassNames: 'u_column' }
                  }
                },
                {
                  contents: [
                    {
                      type: 'text',
                      values: {
                        containerPadding: '10px 15px 8px',
                        _meta: {
                          htmlID: 'u_content_text_6',
                          htmlClassNames: 'u_content_text'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        color: '#6eba79',
                        textAlign: 'left',
                        lineHeight: '160%',
                        linkStyle: {
                          inherit: true,
                          linkColor: '#0000ee',
                          linkHoverColor: '#0000ee',
                          linkUnderline: true,
                          linkHoverUnderline: true
                        },
                        text:
                          '<div><span style="font-size: 20px; line-height: 32px;">JET SKI RIDE</span></div>'
                      }
                    },
                    {
                      type: 'text',
                      values: {
                        containerPadding: '10px 15px',
                        _meta: {
                          htmlID: 'u_content_text_7',
                          htmlClassNames: 'u_content_text'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        color: '#4f4f4f',
                        textAlign: 'left',
                        lineHeight: '150%',
                        linkStyle: {
                          inherit: true,
                          linkColor: '#0000ee',
                          linkHoverColor: '#0000ee',
                          linkUnderline: true,
                          linkHoverUnderline: true
                        },
                        text:
                          '<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</div>'
                      }
                    },
                    {
                      type: 'button',
                      values: {
                        containerPadding: '5px 15px',
                        _meta: {
                          htmlID: 'u_content_button_1',
                          htmlClassNames: 'u_content_button'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        href: '',
                        buttonColors: {
                          color: '#FFF',
                          backgroundColor: '#fa9302',
                          hoverColor: '#cf7a04',
                          hoverBackgroundColor: '#3AAEE0'
                        },
                        textAlign: 'left',
                        lineHeight: '120%',
                        borderRadius: '20px',
                        padding: '10px 20px',
                        calculatedHeight: 36,
                        calculatedWidth: 132,
                        text: 'ORDER NOW<br />'
                      }
                    }
                  ],
                  values: {
                    _meta: { htmlID: 'u_column_5', htmlClassNames: 'u_column' }
                  }
                }
              ],
              values: {
                columns: false,
                backgroundColor: 'rgba(255,255,255,0)',
                columnsBackgroundColor: 'rgba(255,255,255,0)',
                backgroundImage: {
                  url: '',
                  fullWidth: true,
                  repeat: false,
                  center: false,
                  cover: false
                },
                padding: '10px',
                hideDesktop: false,
                hideMobile: false,
                noStackMobile: false,
                _meta: { htmlID: 'u_row_4', htmlClassNames: 'u_row' },
                selectable: true,
                draggable: true,
                deletable: true
              }
            },
            {
              cells: [1],
              columns: [
                {
                  contents: [
                    {
                      type: 'divider',
                      values: {
                        containerPadding: '1px 20px 5px',
                        _meta: {
                          htmlID: 'u_content_divider_2',
                          htmlClassNames: 'u_content_divider'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        width: '100%',
                        border: {
                          borderTopWidth: '1px',
                          borderTopStyle: 'solid',
                          borderTopColor: '#CCC'
                        },
                        textAlign: 'center'
                      }
                    }
                  ],
                  values: {
                    _meta: { htmlID: 'u_column_6', htmlClassNames: 'u_column' }
                  }
                }
              ],
              values: {
                columns: false,
                backgroundColor: 'rgba(255,255,255,0)',
                columnsBackgroundColor: 'rgba(255,255,255,0)',
                backgroundImage: {
                  url: '',
                  fullWidth: true,
                  repeat: false,
                  center: false,
                  cover: false
                },
                padding: '0px',
                hideDesktop: false,
                hideMobile: false,
                noStackMobile: false,
                _meta: { htmlID: 'u_row_5', htmlClassNames: 'u_row' },
                selectable: true,
                draggable: true,
                deletable: true
              }
            },
            {
              cells: [2, 1],
              columns: [
                {
                  contents: [
                    {
                      type: 'text',
                      values: {
                        containerPadding: '10px 15px 8px',
                        _meta: {
                          htmlID: 'u_content_text_8',
                          htmlClassNames: 'u_content_text'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        color: '#6eba79',
                        textAlign: 'left',
                        lineHeight: '160%',
                        linkStyle: {
                          inherit: true,
                          linkColor: '#0000ee',
                          linkHoverColor: '#0000ee',
                          linkUnderline: true,
                          linkHoverUnderline: true
                        },
                        text:
                          '<div><span style="font-size: 20px; line-height: 32px;">BOAT RIDE</span></div>'
                      }
                    },
                    {
                      type: 'text',
                      values: {
                        containerPadding: '10px 15px',
                        _meta: {
                          htmlID: 'u_content_text_9',
                          htmlClassNames: 'u_content_text'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        color: '#4f4f4f',
                        textAlign: 'left',
                        lineHeight: '150%',
                        linkStyle: {
                          inherit: true,
                          linkColor: '#0000ee',
                          linkHoverColor: '#0000ee',
                          linkUnderline: true,
                          linkHoverUnderline: true
                        },
                        text:
                          '<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</div>'
                      }
                    },
                    {
                      type: 'button',
                      values: {
                        containerPadding: '5px 15px',
                        _meta: {
                          htmlID: 'u_content_button_2',
                          htmlClassNames: 'u_content_button'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        href: '',
                        buttonColors: {
                          color: '#FFF',
                          backgroundColor: '#fa9302',
                          hoverColor: '#cf7a04',
                          hoverBackgroundColor: '#3AAEE0'
                        },
                        textAlign: 'left',
                        lineHeight: '120%',
                        borderRadius: '20px',
                        padding: '10px 20px',
                        calculatedHeight: 36,
                        calculatedWidth: 132,
                        text: 'ORDER NOW<br />'
                      }
                    }
                  ],
                  values: {
                    _meta: { htmlID: 'u_column_7', htmlClassNames: 'u_column' }
                  }
                },
                {
                  contents: [
                    {
                      type: 'image',
                      values: {
                        containerPadding: '0px',
                        _meta: {
                          htmlID: 'u_content_image_3',
                          htmlClassNames: 'u_content_image'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        src: {
                          url:
                            'https://a.mailmunch.co/user_data/landing_pages/1500313783372-2.png',
                          width: 500,
                          height: 500
                        },
                        fullWidth: true,
                        textAlign: 'center',
                        maxWidth: '100%',
                        altText: 'Image',
                        action: { url: '', target: '' }
                      }
                    }
                  ],
                  values: {
                    _meta: { htmlID: 'u_column_8', htmlClassNames: 'u_column' }
                  }
                }
              ],
              values: {
                columns: false,
                backgroundColor: 'rgba(255,255,255,0)',
                columnsBackgroundColor: 'rgba(255,255,255,0)',
                backgroundImage: {
                  url: '',
                  fullWidth: true,
                  repeat: false,
                  center: false,
                  cover: false
                },
                padding: '10px',
                hideDesktop: false,
                hideMobile: false,
                noStackMobile: false,
                _meta: { htmlID: 'u_row_6', htmlClassNames: 'u_row' },
                selectable: true,
                draggable: true,
                deletable: true
              }
            },
            {
              cells: [1],
              columns: [
                {
                  contents: [
                    {
                      type: 'divider',
                      values: {
                        containerPadding: '1px 20px 5px',
                        _meta: {
                          htmlID: 'u_content_divider_3',
                          htmlClassNames: 'u_content_divider'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        width: '100%',
                        border: {
                          borderTopWidth: '1px',
                          borderTopStyle: 'solid',
                          borderTopColor: '#CCC'
                        },
                        textAlign: 'center'
                      }
                    }
                  ],
                  values: {
                    _meta: { htmlID: 'u_column_9', htmlClassNames: 'u_column' }
                  }
                }
              ],
              values: {
                columns: false,
                backgroundColor: 'rgba(255,255,255,0)',
                columnsBackgroundColor: 'rgba(255,255,255,0)',
                backgroundImage: {
                  url: '',
                  fullWidth: true,
                  repeat: false,
                  center: false,
                  cover: false
                },
                padding: '0px',
                hideDesktop: false,
                hideMobile: false,
                noStackMobile: false,
                _meta: { htmlID: 'u_row_7', htmlClassNames: 'u_row' },
                selectable: true,
                draggable: true,
                deletable: true
              }
            },
            {
              cells: [1, 2],
              columns: [
                {
                  contents: [
                    {
                      type: 'image',
                      values: {
                        containerPadding: '0px',
                        _meta: {
                          htmlID: 'u_content_image_4',
                          htmlClassNames: 'u_content_image'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        src: {
                          url:
                            'https://a.mailmunch.co/user_data/landing_pages/1500314095876-3.png',
                          width: 500,
                          height: 500
                        },
                        fullWidth: true,
                        textAlign: 'center',
                        maxWidth: '100%',
                        altText: 'Image',
                        action: { url: '', target: '' }
                      }
                    }
                  ],
                  values: {
                    _meta: { htmlID: 'u_column_10', htmlClassNames: 'u_column' }
                  }
                },
                {
                  contents: [
                    {
                      type: 'text',
                      values: {
                        containerPadding: '10px 15px 8px',
                        _meta: {
                          htmlID: 'u_content_text_10',
                          htmlClassNames: 'u_content_text'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        color: '#6eba79',
                        textAlign: 'left',
                        lineHeight: '160%',
                        linkStyle: {
                          inherit: true,
                          linkColor: '#0000ee',
                          linkHoverColor: '#0000ee',
                          linkUnderline: true,
                          linkHoverUnderline: true
                        },
                        text:
                          '<div><span style="font-size: 20px; line-height: 32px;">BEACH DAY</span></div>'
                      }
                    },
                    {
                      type: 'text',
                      values: {
                        containerPadding: '10px 15px',
                        _meta: {
                          htmlID: 'u_content_text_11',
                          htmlClassNames: 'u_content_text'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        color: '#4f4f4f',
                        textAlign: 'left',
                        lineHeight: '150%',
                        linkStyle: {
                          inherit: true,
                          linkColor: '#0000ee',
                          linkHoverColor: '#0000ee',
                          linkUnderline: true,
                          linkHoverUnderline: true
                        },
                        text:
                          '<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</div>'
                      }
                    },
                    {
                      type: 'button',
                      values: {
                        containerPadding: '5px 15px',
                        _meta: {
                          htmlID: 'u_content_button_3',
                          htmlClassNames: 'u_content_button'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        href: '',
                        buttonColors: {
                          color: '#FFF',
                          backgroundColor: '#fa9302',
                          hoverColor: '#cf7a04',
                          hoverBackgroundColor: '#3AAEE0'
                        },
                        textAlign: 'left',
                        lineHeight: '120%',
                        borderRadius: '20px',
                        padding: '10px 20px',
                        calculatedHeight: 36,
                        calculatedWidth: 132,
                        text: 'ORDER NOW<br />'
                      }
                    }
                  ],
                  values: {
                    _meta: { htmlID: 'u_column_11', htmlClassNames: 'u_column' }
                  }
                }
              ],
              values: {
                columns: false,
                backgroundColor: 'rgba(255,255,255,0)',
                columnsBackgroundColor: 'rgba(255,255,255,0)',
                backgroundImage: {
                  url: '',
                  fullWidth: true,
                  repeat: false,
                  center: false,
                  cover: false
                },
                padding: '10px',
                hideDesktop: false,
                hideMobile: false,
                noStackMobile: false,
                _meta: { htmlID: 'u_row_8', htmlClassNames: 'u_row' },
                selectable: true,
                draggable: true,
                deletable: true
              }
            },
            {
              cells: [1],
              columns: [
                {
                  contents: [
                    {
                      type: 'divider',
                      values: {
                        containerPadding: '1px 20px 5px',
                        _meta: {
                          htmlID: 'u_content_divider_4',
                          htmlClassNames: 'u_content_divider'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        width: '100%',
                        border: {
                          borderTopWidth: '1px',
                          borderTopStyle: 'solid',
                          borderTopColor: '#CCC'
                        },
                        textAlign: 'center'
                      }
                    }
                  ],
                  values: {
                    _meta: { htmlID: 'u_column_12', htmlClassNames: 'u_column' }
                  }
                }
              ],
              values: {
                columns: false,
                backgroundColor: 'rgba(255,255,255,0)',
                columnsBackgroundColor: 'rgba(255,255,255,0)',
                backgroundImage: {
                  url: '',
                  fullWidth: true,
                  repeat: false,
                  center: false,
                  cover: false
                },
                padding: '0px',
                hideDesktop: false,
                hideMobile: false,
                noStackMobile: false,
                _meta: { htmlID: 'u_row_9', htmlClassNames: 'u_row' },
                selectable: true,
                draggable: true,
                deletable: true
              }
            },
            {
              cells: [1],
              columns: [
                {
                  contents: [
                    {
                      type: 'text',
                      values: {
                        containerPadding: '15px',
                        _meta: {
                          htmlID: 'u_content_text_12',
                          htmlClassNames: 'u_content_text'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        color: '#fa9302',
                        textAlign: 'center',
                        lineHeight: '130%',
                        linkStyle: {
                          inherit: true,
                          linkColor: '#0000ee',
                          linkHoverColor: '#0000ee',
                          linkUnderline: true,
                          linkHoverUnderline: true
                        },
                        text:
                          '<div><span style="font-size: 36px; line-height: 46.8px;">NEED MORE INFORMATION?</span></div>'
                      }
                    },
                    {
                      type: 'text',
                      values: {
                        containerPadding: '10px',
                        _meta: {
                          htmlID: 'u_content_text_13',
                          htmlClassNames: 'u_content_text'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        color: '#4f4f4f',
                        textAlign: 'center',
                        lineHeight: '120%',
                        linkStyle: {
                          inherit: true,
                          linkColor: '#0000ee',
                          linkHoverColor: '#0000ee',
                          linkUnderline: true,
                          linkHoverUnderline: true
                        },
                        text:
                          '<div><span style="font-size: 20px; line-height: 24px;">Subscribe to get updates.</span></div>'
                      }
                    },
                    {
                      type: 'button',
                      values: {
                        containerPadding: '20px',
                        _meta: {
                          htmlID: 'u_content_button_4',
                          htmlClassNames: 'u_content_button'
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        href: '',
                        buttonColors: {
                          color: '#FFF',
                          backgroundColor: '#6eba79',
                          hoverColor: '#58a864',
                          hoverBackgroundColor: '#3AAEE0'
                        },
                        textAlign: 'center',
                        lineHeight: '160%',
                        borderRadius: '37px',
                        padding: '10px 20px',
                        calculatedHeight: 52,
                        calculatedWidth: 214,
                        text:
                          '<span style="font-size: 20px; line-height: 32px;">SUBSCRIBE NOW</span>'
                      }
                    }
                  ],
                  values: {
                    _meta: { htmlID: 'u_column_13', htmlClassNames: 'u_column' }
                  }
                }
              ],
              values: {
                columns: false,
                backgroundColor: 'rgba(255,255,255,0)',
                columnsBackgroundColor: 'rgba(255,255,255,0)',
                backgroundImage: {
                  url: '',
                  fullWidth: true,
                  repeat: false,
                  center: false,
                  cover: false
                },
                padding: '10px',
                hideDesktop: false,
                hideMobile: false,
                noStackMobile: false,
                _meta: { htmlID: 'u_row_10', htmlClassNames: 'u_row' },
                selectable: true,
                draggable: true,
                deletable: true
              }
            },
            {
              cells: [1],
              columns: [
                {
                  contents: [
                    {
                      type: 'text',
                      values: {
                        containerPadding: '20px',
                        _meta: {
                          htmlID: 'u_content_text_14',
                          htmlClassNames: 'u_content_text'
                        },
                        selectable: false,
                        draggable: false,
                        deletable: false,
                        color: '#000',
                        textAlign: 'left',
                        lineHeight: '120%',
                        linkStyle: {
                          inherit: true,
                          linkColor: '#0000ee',
                          linkHoverColor: '#0000ee',
                          linkUnderline: true,
                          linkHoverUnderline: true
                        },
                        text:
                          '<div style="font-family: arial, helvetica, sans-serif;"><span style="font-size: 12px; color: #999999; line-height: 14.4px;">You received this email because you signed up for .</span></div>\n<div style="font-family: arial, helvetica, sans-serif;">&nbsp;</div>\n<div style="font-family: arial, helvetica, sans-serif;"><span style="font-size: 12px; color: #999999; line-height: 14.4px;"></span></div>'
                      }
                    }
                  ],
                  values: {
                    _meta: { htmlID: 'u_column_14', htmlClassNames: 'u_column' }
                  }
                }
              ],
              values: {
                columns: false,
                backgroundColor: '#f0f0f0',
                columnsBackgroundColor: 'rgba(255,255,255,0)',
                backgroundImage: {
                  url: '',
                  fullWidth: true,
                  repeat: false,
                  center: false,
                  cover: false
                },
                padding: '30px',
                hideDesktop: false,
                hideMobile: false,
                noStackMobile: false,
                _meta: { htmlID: 'u_row_11', htmlClassNames: 'u_row' },
                selectable: false,
                draggable: false,
                deletable: false
              }
            }
          ],
          values: {
            backgroundColor: '#ffffff',
            backgroundImage: {
              url: '',
              fullWidth: true,
              repeat: false,
              center: true,
              cover: false
            },
            contentWidth: '600px',
            fontFamily: {
              label: 'Montserrat',
              value: "'Montserrat',sans-serif",
              type: 'google',
              weights: '400,700'
            },
            linkStyle: {
              body: true,
              linkColor: '#0000ee',
              linkHoverColor: '#0000ee',
              linkUnderline: true,
              linkHoverUnderline: true
            },
            _meta: { htmlID: 'u_body', htmlClassNames: 'u_body' }
          }
        }
      }
    }
  ];
  const wrap = shallow(
    <HomePageContainer store={mockStore({ session: {} })} />
  );
  wrap.setState({ causes: fakeCauses });
  it('renders without crashing', () => {
    expect(wrap.exists());
  });
});
