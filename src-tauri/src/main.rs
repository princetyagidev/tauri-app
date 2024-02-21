#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{self,Manager,Menu,Submenu, 
    SystemTray,SystemTrayMenu,SystemTrayMenuItem,CustomMenuItem,SystemTrayEvent};



//loadings functionality
#[tauri::command]
fn close_splash_screen(window: tauri::Window) {
    // Close splashscreen
    if let Some(splashscreen) = window.get_window("splashscreen") {
        splashscreen.close().unwrap();
    }
    // Show main window
    window.get_window("main").unwrap().show().unwrap();
}
// system tray functionality
fn setup_system_tray() -> SystemTray {
    let quit = CustomMenuItem::new("quit".to_string(), "exit");
    // let show_hide = CustomMenuItem::new("show_hide".to_string(), "Show");
    let settings = CustomMenuItem::new("settings".to_string(), "settings");
    let tray_menu = SystemTrayMenu::new()
        // .add_native_item(SystemTrayMenuItem::Separator)
        // .add_item(show_hide)
        .add_item(settings)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);
       // Remove the semicolon after this line
    SystemTray::new().with_menu(tray_menu).with_tooltip("Optra App")
}

// window menu bar functionality    
fn menu_bar() -> Menu {
    let close = CustomMenuItem::new("close".to_string(), "exit");
    let submenu = Submenu::new("File", Menu::new().add_item(close));
    let menu = Menu::new()
        .add_submenu(submenu) 
        .add_item(CustomMenuItem::new("hide", "Hide"));
    menu
}


fn main() {
    let system_tray = setup_system_tray();
    let _menu = menu_bar(); 
   
    tauri::Builder
        ::default()
        .system_tray(system_tray)
        // .plugin(tauri_plugin_window_state::Builder::default().build())
        // Set up the menu for the main window
        // .menu(menu)
        .on_menu_event(|event| {
            match event.menu_item_id() {
                
                "close" => {
                    event.window().close().unwrap();
                }
                _ => {}
            }
        })
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
              } => {
                 // Toggle between minimizing and maximizing the main window
                 let window = app.get_window("main").unwrap();
                 if window.is_minimized().unwrap() {
                    window.unminimize().unwrap(); // Restore (maximize) the window
                } else {
                    window.minimize().unwrap(); // Minimize the window
                }
              }
            // menu item Tray event
            SystemTrayEvent::MenuItemClick { id, .. } => {
                let _item_handle = app.tray_handle().get_item(&id);
                let window = app.get_window("main").unwrap();
                match id.as_str() {
                    
                    // "show_hide" => {
                    //     if window.is_visible().unwrap() {
                    //         window.hide().unwrap();
                    //         _item_handle.set_title("Show").unwrap(); // Corrected line
                    //     } else {
                    //         window.show().unwrap();
                    //         _item_handle.set_title("Hide").unwrap(); // Assuming you want to change it to "Hide" when showing
                    //     }
                    // }
                    "settings" => {
                      println!("Setting page event")
                    }
                    "quit" => {
                       
                        window.close().unwrap();
                   }
                    _ => {}
                }
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![close_splash_screen])
        .setup(|app| {
            let splashscreen_window = app.get_window("splashscreen").unwrap();
            let main_window = app.get_window("main").unwrap();
          
        
            tauri::async_runtime::spawn(async move {
                println!("Initializing...");
                std::thread::sleep(std::time::Duration::from_secs(1));
                println!("Done initializing.");
                splashscreen_window.close().unwrap();
                main_window.show().unwrap();
               
               
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
