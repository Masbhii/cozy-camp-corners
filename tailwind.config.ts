
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for our app
				"neutral-gray": "#8E9196",
				"primary-purple": "#9b87f5",
				"secondary-purple": "#7E69AB",
				"light-purple": "#D6BCFA",
				"soft-gray": "#F1F0FB",
				"soft-peach": "#FDE1D3",
				"soft-blue": "#D3E4FD",
				"cool-gray": "#aaadb0",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'card': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
				'card-hover': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
				'inset-light': 'inset 0 1px 3px rgba(0,0,0,0.1)',
				'button': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
				'button-press': 'inset 0 1px 3px rgba(0,0,0,0.25)',
			},
			backgroundImage: {
				'paper-texture': "url('data:image/png;base64,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')",
				'cork-texture': "url('data:image/png;base64,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')",
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
